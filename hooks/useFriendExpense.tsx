import {
  QueryKey,
  UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {
  FriendExpense,
  ICreateFriendExpenseParams,
  IFriendExpenseListItem,
  IFriendExpenses,
} from '../api/friendExpense';
import {INavigationProps} from '../components/PageNavigator';
import {userQueryKey} from './useCurrentUser';
import {useModel} from './useModel';

interface IFriendExpenseListContext {
  friendExpenses: IFriendExpenseListItem[];
  isFetching: boolean;
}

interface IFriendExpensesContext {
  friendExpenses: IFriendExpenses[];
  isFetching: boolean;
  create: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    ICreateFriendExpenseParams,
    unknown
  >;
  update: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    ICreateFriendExpenseParams & {expenseId: string},
    unknown
  >;
}

export function friendListKey(): QueryKey {
  return ['friendList', userQueryKey()];
}

export function friendExpensesListKey(friendId: string, term = ''): QueryKey {
  return [
    'friendExpenses',
    'friendId',
    friendId.toString(),
    userQueryKey(),
    term.toString(),
  ];
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
    queryKey: friendListKey(),
    queryFn: async () => {
      const response = await (await FriendModel).all();

      if (response.status !== 200) {
        throw new Error('could not fetch friend expenses');
      }

      return response.data.data;
    },
    enabled: enabled,
  });

  return {
    friendExpenses: data ?? [],
    isFetching,
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
    queryKey: friendExpensesListKey(friendId, term),
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
    mutationKey: friendExpensesListKey(friendId),
    mutationFn: async (expense: ICreateFriendExpenseParams) => {
      return await (await FriendModel).create(expense);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: friendExpensesListKey(friendId),
      });

      navigation?.goBack();
    },
  });

  const update = useMutation({
    mutationFn: async (
      expense: ICreateFriendExpenseParams & {expenseId: string},
    ) => {
      return await (
        await FriendModel
      ).update({id: expense.expenseId, ...expense});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: friendExpensesListKey(friendId, term),
        refetchType: 'all',
      });

      navigation?.goBack();
    },
  });

  return {
    friendExpenses: data?.pages[0].data ?? [],
    isFetching,
    create,
    update,
  };
};
