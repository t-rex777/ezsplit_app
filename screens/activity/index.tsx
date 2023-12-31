import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AddExpense} from '../../components/AddExpense';
import {type INavigationProps} from '../../components/PageNavigator';

interface IIndexProps extends INavigationProps {}

const ActivityScreen = ({navigation}: IIndexProps): JSX.Element => {
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

      <View>
        <AddExpense navigation={navigation} />
      </View>
    </View>
  );
};

export {ActivityScreen};

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
