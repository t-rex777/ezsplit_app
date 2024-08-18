import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {IFriendExpenseListItem} from '../../api/friendExpense';
import {INavigationProps} from '../../components/PageNavigator';
import {useFriendExpenseList} from '../../hooks/useFriendExpense';
import {FriendCard} from './friendCard';

interface IIndexProps extends INavigationProps {}

const FriendScreen = ({navigation}: IIndexProps): JSX.Element => {
  const {friendExpenses} = useFriendExpenseList();

  const navigateToFriendExpense = (friendExpense: IFriendExpenseListItem) => {
    navigation.navigate('FriendExpenses', {
      friendExpense,
    });
  };

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
        <View style={style.cards}>
          {friendExpenses.map(friendExpense => (
            <FriendCard
              key={friendExpense.id}
              data={friendExpense}
              navigateToFriendExpense={navigateToFriendExpense}
            />
          ))}
        </View>
      </ScrollView>

      {/*
      TODO: add this after adding friends
      <View>
        <AddExpense navigation={navigation} />
      </View> */}
    </View>
  );
};

export {FriendScreen};

const screenHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  cards: {},
  container: {
    height: screenHeight - 76,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
