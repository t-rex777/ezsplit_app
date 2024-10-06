import React, {useCallback} from 'react';
import {Dimensions, ScrollView, Share, StyleSheet, View} from 'react-native';
import {Appbar, Button, Text} from 'react-native-paper';
import {IFriendExpenseListItem} from '../../api/friendExpense';
import {INavigationProps} from '../../components/PageNavigator';
import {useToast} from '../../components/Toast';
import {useFriendExpenseList} from '../../hooks/useFriendExpense';
import {FriendCard} from './friendCard';
interface IFriendListProps extends INavigationProps {}

const FriendScreen = ({navigation}: IFriendListProps): JSX.Element => {
  const toast = useToast();
  const {friendExpenses} = useFriendExpenseList();

  const navigateToFriendExpense = (friendExpense: IFriendExpenseListItem) => {
    navigation.navigate('FriendExpenses', {
      friendExpense,
    });
  };

  const handleShareLink = useCallback(async () => {
    try {
      const result = await Share.share({
        title: 'Share APK with friends',
        message:
          'Please install it from the given link, AppLink :https://github.com/t-rex777/ezsplit_app/assets/app-release.apk',
      });
      if (result.action === Share.sharedAction) {
        toast.addMessage('Wait for them to join');
      }
    } catch (error: any) {
      console.error(error);
      toast.addMessage('something went wrong');
    }
  }, [toast]);

  return (
    <View style={style.container}>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Friends" />
          <Appbar.Action icon="magnify" />
          <Appbar.Action icon="account-multiple-plus" />
        </Appbar.Header>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={style.empty}>
          <Text variant="headlineMedium" style={style.textCenter}>
            Welcome aboard!
          </Text>

          <Text variant="titleMedium">
            Invite your friends to start splitting expenses
          </Text>

          <Button icon="download" mode="contained" onPress={handleShareLink}>
            Invite
          </Button>
        </View>

        {friendExpenses.length > 0 && (
          <View style={style.cards}>
            {friendExpenses.map(friendExpense => (
              <FriendCard
                key={friendExpense.id}
                data={friendExpense}
                navigateToFriendExpense={navigateToFriendExpense}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export {FriendScreen};

const screenHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  cards: {},
  textCenter: {
    textAlign: 'center',
  },
  empty: {
    marginTop: 24,
    marginBottom: 24,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  container: {
    height: screenHeight - 76,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
