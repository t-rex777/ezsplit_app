import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AddExpense} from '../../components/AddExpense';
import {INavigationProps} from '../../components/PageNavigator';
import {GroupCard} from './groupCard';
import {Header} from './header';

interface IGroupProps extends INavigationProps {}

const GroupScreen = ({navigation}: IGroupProps): JSX.Element => {
  return (
    <View style={style.container}>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Groups" />
          <Appbar.Action icon="magnify" />
          <Appbar.Action icon="account-multiple-plus" />
        </Appbar.Header>
      </View>

      <Header />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={style.cards}>
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
          <GroupCard title={'TMG'} money={99.99} />
        </View>
      </ScrollView>

      <View>
        <AddExpense navigation={navigation} />
      </View>
    </View>
  );
};

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

export default GroupScreen;
