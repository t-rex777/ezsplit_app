import {RouteProp} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Text, TextInput} from 'react-native-paper';
import {useDebounce} from 'react-use';
import {IFriendExpenseListItem} from '../../api/friendExpense';
import {AddExpense} from '../../components/AddExpense';
import {INavigationProps} from '../../components/PageNavigator';
import {useCurrentUser} from '../../hooks/useCurrentUser';
import {useFriendExpenses} from '../../hooks/useFriendExpense';
import {theme} from '../../theme';
import {ExpenseCard} from './expenseCard';

interface IFriendExpensesProps extends INavigationProps {
  route: RouteProp<
    {
      FriendExpenses: {friendExpense: IFriendExpenseListItem};
    },
    'FriendExpenses'
  >;
}

const FriendExpenses = ({navigation, route}: IFriendExpensesProps) => {
  const [search, setSearch] = useState('');

  const [debouncedValue, setDebouncedValue] = useState('');
  useDebounce(
    () => {
      setSearch(debouncedValue);
    },
    500,
    [debouncedValue],
  );

  const {friendExpenses, isFetching} = useFriendExpenses(
    route.params?.friendExpense?.id,
    search,
  );

  const {user} = useCurrentUser(navigation);

  const handleChange = useCallback((term = '') => {
    setDebouncedValue(term);
  }, []);

  if (isFetching) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View>
        <View>
          <Appbar.Header style={{display: 'flex', flexDirection: 'row'}}>
            <Appbar.BackAction
              onPress={() => {
                navigation.goBack();
              }}
            />

            <Appbar.Content title={route.params.friendExpense.name} />

            <TextInput
              value={debouncedValue}
              onChangeText={handleChange}
              outlineColor={theme.colors.primary}
              mode="flat"
              placeholder="search expenses"
              left={<TextInput.Icon icon="magnify" />}
              style={{backgroundColor: 'transparent', flexGrow: 1}}
              autoFocus
            />
          </Appbar.Header>
        </View>

        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {friendExpenses.map(
            ({category, currency, createdAt, name, users, id, totalAmount}) => {
              const friend = users.find(u => Number(u.id) !== Number(user.id));

              if (!friend) {
                return null;
              }

              return (
                <ExpenseCard
                  key={id}
                  date={createdAt}
                  expenseName={name}
                  currency={currency}
                  friendName={friend.name}
                  categoryName={category.name}
                  totalAmount={totalAmount}
                  friendAmount={friend.amount}
                  categoryImage={category.image}
                  isFriendLender={friend.isLender}
                />
              );
            },
          )}
        </ScrollView>
      </View>
      <View>
        <AddExpense
          navigation={navigation}
          friend={route.params.friendExpense}
        />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export {FriendExpenses};
