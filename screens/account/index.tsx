import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Appbar, Button, IconButton, Text} from 'react-native-paper';
import {AuthModel} from '../../api/auth';
import EZAvatar from '../../components/Avatar';
import {INavigationProps, useAuth} from '../../components/PageNavigator';
import {theme} from '../../theme';

interface IIndexProps extends INavigationProps {}

const AccountScreen = ({navigation}: IIndexProps): JSX.Element => {
  const auth = useAuth();

  const handleLogOut = useCallback(async () => {
    await new AuthModel(navigation).logout();
    auth?.setIsAuthenticated(false);

    navigation?.navigate?.('SignIn');
  }, [auth, navigation]);

  return (
    <View style={style.container}>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Account" />
          <Appbar.Action icon="magnify" />
        </Appbar.Header>

        <View>
          <View style={style.profile}>
            <View style={style.profileInfo}>
              <EZAvatar label="MS" size={60} />

              <View>
                <Text variant="titleMedium">Morris</Text>
                <Text variant="bodyLarge">morrisjakson@gmail.com</Text>
              </View>
            </View>

            <IconButton
              icon="pencil"
              size={30}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </View>
      </View>

      <View>
        <Button
          mode="contained"
          icon="logout"
          onPress={handleLogOut}
          style={style.logout}
          buttonColor={theme.colors.error}>
          Log out
        </Button>
      </View>
    </View>
  );
};

export {AccountScreen};

const screenHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logout: {borderRadius: 20},
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    height: screenHeight - 76,
    display: 'flex',
    gap: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingTop: 12,
    paddingRight: 4,
    paddingBottom: 12,
  },
});
