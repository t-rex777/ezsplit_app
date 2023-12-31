import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Appbar, IconButton, Text} from 'react-native-paper';
import EZAvatar from '../../components/Avatar';
import {INavigationProps} from '../../components/PageNavigator';

interface IIndexProps extends INavigationProps {}

const AccountScreen = ({}: IIndexProps): JSX.Element => {
  return (
    <View style={style.container}>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Account" />
          <Appbar.Action icon="magnify" />
        </Appbar.Header>
      </View>

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
  );
};

export {AccountScreen};

const screenHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  cards: {},
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    height: screenHeight - 76,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingLeft: 16,
    paddingTop: 12,
    paddingRight: 4,
    paddingBottom: 12,
  },
});
