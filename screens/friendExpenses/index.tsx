import {RouteProp} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {useDebounce, useEffectOnce} from 'react-use';
import {Category} from '../../api/category';
import {IFriendExpenseListItem, IFriendExpenses} from '../../api/friendExpense';
import {INavigationProps} from '../../components/PageNavigator';
import {userCategoryKey} from '../../hooks/useCategory';
import {useCurrentUser} from '../../hooks/useCurrentUser';
import {useFriendExpenses} from '../../hooks/useFriendExpense';
import {useModel} from '../../hooks/useModel';
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

  const queryClient = useQueryClient();
  const CategoryModel = useModel(Category);

  const [debouncedValue, setDebouncedValue] = useState('');
  useDebounce(
    () => {
      setSearch(debouncedValue);
    },
    500,
    [debouncedValue],
  );

  const {friendExpenses, isFetching} = useFriendExpenses(
    navigation,
    route.params?.friendExpense?.id,
    search,
  );

  const {user} = useCurrentUser(navigation);

  const handleChange = useCallback((term = '') => {
    setDebouncedValue(term);
  }, []);

  useEffectOnce(() => {
    /**
     * prefetching categories so that the moment
     * we open expense page, the categories will be loaded
     */
    queryClient.prefetchQuery({
      queryKey: userCategoryKey(),
      queryFn: async () => {
        const response = await (await CategoryModel).all();

        return response.data.data;
      },
    });
  });

  const handleEditExpense = useCallback(
    (expense: IFriendExpenses): void => {
      navigation.navigate('Expense', {
        expense,
        friend: expense.users.find(u => Number(u.id) !== Number(user.id)),
      });
    },
    [navigation, user.id],
  );

  const hasExpenseWithFriend = useMemo(() => {
    return route.params?.friendExpense?.hasExpense === true;
  }, [route.params?.friendExpense?.hasExpense]);

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
              // autoFocus
            />
          </Appbar.Header>
        </View>

        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {!hasExpenseWithFriend && (
            <View style={style.empty}>
              <Text variant="headlineMedium" style={style.textCenter}>
                Add your first expense
              </Text>

              <Text variant="bodyMedium" style={style.textCenter}>
                {`you will be adding expense between you and ${route.params?.friendExpense.name}`}
              </Text>
            </View>
          )}

          {hasExpenseWithFriend &&
            friendExpenses.map(expense => {
              const {
                category,
                currency,
                createdAt,
                name,
                users,
                id,
                totalAmount,
              } = expense;

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
                  onPress={() => handleEditExpense(expense)}
                />
              );
            })}
        </ScrollView>
      </View>

      <View style={style.btnContainer}>
        <Button
          icon="clipboard-list-outline"
          mode="contained"
          style={style.button}
          dark
          onPress={() =>
            navigation.navigate('Expense', {
              friend: route.params.friendExpense,
            })
          }>
          Add Expense
        </Button>
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  empty: {
    padding: 24,
    gap: 8,
    height: screenHeight - 180,
  },
  container: {
    height: screenHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
  },
  btnContainer: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
});

export {FriendExpenses};
