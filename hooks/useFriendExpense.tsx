import {
  QueryKey,
  UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  FriendExpense,
  ICreateFriendExpenseParams,
  IFriendExpenseListItem,
  IFriendExpenses,
} from '../api/friendExpense';
import {INavigationProps} from '../components/PageNavigator';
import {useModel} from './helper';
import {userQueryKey} from './useCurrentUser';

interface IFriendExpenseListContext {
  friendExpenses: IFriendExpenseListItem[];
  isFetching: boolean;
}

interface IFriendExpensesContext {
  friendExpenses: IFriendExpenses[];
  isFetching: boolean;
  create: UseMutationResult<void, Error, ICreateFriendExpenseParams, unknown>;
  update: UseMutationResult<
    void,
    Error,
    ICreateFriendExpenseParams & {
      expenseId: string;
    },
    unknown
  >;
}

export function friendExpensesKey(friendId?: string, term = ''): QueryKey {
  if (friendId !== undefined) {
    return ['friendExpenses', friendId, userQueryKey(), term];
  }

  return ['friendExpenses', userQueryKey(), term];
}

export function useFriendExpenseKey(expenseId: string): QueryKey {
  return ['friendExpense', expenseId, friendExpensesKey()];
}

/**
 * returns all the friends with whom the user has expenses
 */
export const useFriendExpenseList = (
  navigation?: INavigationProps['navigation'],
  enabled = true,
): IFriendExpenseListContext => {
  // const queryClient = useQueryClient();

  const FriendModel = useModel(FriendExpense);

  const {data, isFetching} = useQuery({
    queryKey: friendExpensesKey(),
    queryFn: async () => {
      const response = await (await FriendModel).all();

      if (response.status !== 200) {
        throw new Error('could not fetch friend expenses');
      }

      return response.data.data;
    },
    enabled: enabled,
  });

  // const create = useMutation({
  //   mutationKey: friendExpenseKey(),
  //   mutationFn: async (expense: ICreateFriendExpenseParams) => {
  //     await (await FriendModel).create(expense);
  //   },
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: friendExpenseKey(),
  //     });

  //     navigation?.navigate('FriendExpenses');
  //   },
  // });

  return {
    friendExpenses: data ?? [],
    isFetching,
    // create,
  };
};

/**
 * return all the expenses of a particular friend
 */
export const useFriendExpenses = (
  navigation: INavigationProps['navigation'],
  friendId: string,
  term = '',
): IFriendExpensesContext => {
  const queryClient = useQueryClient();

  const FriendModel = useModel(FriendExpense);

  const {data, isFetching} = useInfiniteQuery({
    queryKey: friendExpensesKey(friendId, term),
    initialPageParam: 1,
    queryFn: async ({pageParam = 1}) => {
      const response = await (
        await FriendModel
      ).findFriendExpenses(friendId, {
        page: pageParam,
        page_size: 20,
        term,
      });

      if (response.status !== 200) {
        throw new Error('could not fetch friend expenses');
      }

      return response.data;
    },
    getNextPageParam: args => {
      const nextPage = args?.meta?.pagination?.next_page;
      if (nextPage === undefined || nextPage === null) {
        return undefined;
      }

      return nextPage;
    },
  });

  const create = useMutation({
    mutationKey: friendExpensesKey(friendId),
    mutationFn: async (expense: ICreateFriendExpenseParams) => {
      await (await FriendModel).create(expense);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: friendExpensesKey(friendId),
      });

      navigation?.navigate('FriendExpenses');
    },
  });

  const update = useMutation({
    mutationKey: friendExpensesKey(friendId),
    mutationFn: async (
      expense: ICreateFriendExpenseParams & {expenseId: string},
    ) => {
      await (await FriendModel).update({id: expense.expenseId, ...expense});
    },
    // TODO: handle pagination
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: friendExpensesKey(friendId),
      });

      navigation?.navigate('FriendExpenses');
    },
  });

  return {
    friendExpenses: data?.pages[0].data ?? [],
    isFetching,
    create,
    update,
  };
};

export const useFriendExpense = (
  expenseId: string,
  enabled = false,
): {
  expense: IFriendExpenses | null;
  isFetching: boolean;
} => {
  const FriendModel = useModel(FriendExpense);

  const {data, isFetching} = useQuery({
    queryKey: useFriendExpenseKey(expenseId),
    queryFn: async () => {
      const response = await (await FriendModel).findExpense(expenseId);

      if (response.status !== 200) {
        throw new Error('could not fetch friend expenses');
      }
      return response.data.data;
    },
    enabled,
  });

  return {expense: data ?? null, isFetching};
};
