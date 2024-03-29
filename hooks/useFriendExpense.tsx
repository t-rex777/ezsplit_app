import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import * as Keychain from 'react-native-keychain';
import {FriendExpense, IFriendExpense} from '../api/friendExpense';
import {userQueryKey} from './useCurrentUser';

interface IFriendExpenseContext {
  friendExpenses: IFriendExpense[];
  isFetching: boolean;
}

export const friendExpenseKey = (id?: string) => {
  if (id !== undefined) {
    return ['friendExpenses', id, userQueryKey()];
  }

  return ['friendExpenses', userQueryKey()];
};

export const useFriendExpense = (): IFriendExpenseContext => {
  const FriendModel = useMemo(async () => {
    const key = await Keychain.getGenericPassword();

    const headers =
      key !== false
        ? {authorization: 'Bearer ' + JSON.parse(key.password).__token}
        : undefined;

    return new FriendExpense(headers);
  }, []);

  const {data, isFetching} = useQuery({
    queryKey: friendExpenseKey(),
    queryFn: async () => {
      const response = await (await FriendModel).all();

      if (response.status !== 200) {
        throw new Error('could not fetch friend expenses');
      }

      return response.data.data;
    },
  });

  console.log('FRIEND', data);

  return {
    friendExpenses: data ?? [],
    isFetching,
  };
};
