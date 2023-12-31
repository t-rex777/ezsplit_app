import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AddExpense} from '../../components/AddExpense';
import {INavigationProps} from '../../components/PageNavigator';
import {FriendCard} from './friendCard';

interface IIndexProps extends INavigationProps {}

const FriendScreen = ({navigation}: IIndexProps): JSX.Element => {
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
          <FriendCard
            title={'Roberts'}
            groups={[
              {
                id: '1',
                money: 99.99,
                name: 'hello',
              },
              {
                id: '1',
                money: 929.99,
                name: 'Chloe',
              },
              {
                id: '1',
                money: 199.99,
                name: 'Lavina',
              },
            ]}
          />
          <FriendCard
            title={'Roberts'}
            groups={[
              {
                id: '1',
                money: 99.99,
                name: 'hello',
              },
              {
                id: '1',
                money: 929.99,
                name: 'Chloe',
              },
              {
                id: '1',
                money: 199.99,
                name: 'Lavina',
              },
            ]}
          />
          <FriendCard
            title={'Roberts'}
            groups={[
              {
                id: '1',
                money: 99.99,
                name: 'hello',
              },
              {
                id: '1',
                money: 929.99,
                name: 'Chloe',
              },
              {
                id: '1',
                money: 199.99,
                name: 'Lavina',
              },
            ]}
          />
          <FriendCard
            title={'Roberts'}
            groups={[
              {
                id: '1',
                money: 99.99,
                name: 'hello',
              },
              {
                id: '1',
                money: 929.99,
                name: 'Chloe',
              },
              {
                id: '1',
                money: 199.99,
                name: 'Lavina',
              },
            ]}
          />
          <FriendCard
            title={'Roberts'}
            groups={[
              {
                id: '1',
                money: 99.99,
                name: 'hello',
              },
              {
                id: '1',
                money: 929.99,
                name: 'Chloe',
              },
              {
                id: '1',
                money: 199.99,
                name: 'Lavina',
              },
            ]}
          />
          <FriendCard
            title={'Roberts'}
            groups={[
              {
                id: '1',
                money: 99.99,
                name: 'hello',
              },
              {
                id: '1',
                money: 929.99,
                name: 'Chloe',
              },
              {
                id: '1',
                money: 199.99,
                name: 'Lavina',
              },
            ]}
          />
        </View>
      </ScrollView>

      <View>
        <AddExpense navigation={navigation} />
      </View>
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
