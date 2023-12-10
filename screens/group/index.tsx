import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AddExpense} from '../../components/addExpense';
import {GroupCard} from './groupCard';
import {Header} from './header';

interface IGroupProps {}

const Group = ({}: IGroupProps): JSX.Element => {
  return (
    <View style={style.container}>
      <View>
        <Appbar.Header>
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
        <AddExpense />
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

export default Group;
