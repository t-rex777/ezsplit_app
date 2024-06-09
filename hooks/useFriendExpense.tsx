import {
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
  create: UseMutationResult<void, Error, ICreateFriendExpenseParams, unknown>;
}

interface IFriendExpensesContext {
  friendExpenses: IFriendExpenses[];
  isFetching: boolean;
}

export const friendExpenseKey = (id?: string, term = '') => {
  if (id !== undefined) {
    return ['friendExpenses', id, userQueryKey(), term];
  }

  return ['friendExpenses', userQueryKey(), term];
};

export const useFriendExpenseList = (
  navigation?: INavigationProps['navigation'],
): IFriendExpenseListContext => {
  const queryClient = useQueryClient();

  const FriendModel = useModel(FriendExpense);

  // TODO: useInfinite
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

  const create = useMutation({
    mutationKey: friendExpenseKey(),
    mutationFn: async (expense: ICreateFriendExpenseParams) => {
      await (await FriendModel).create(expense);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: friendExpenseKey(),
      });

      navigation?.navigate('FriendExpenses');
    },
  });

  return {
    friendExpenses: data ?? [],
    isFetching,
    create,
  };
};

export const useFriendExpenses = (
  friendId: string,
  term = '',
): IFriendExpensesContext => {
  const FriendModel = useModel(FriendExpense);

  const {data, isFetching} = useInfiniteQuery({
    queryKey: friendExpenseKey(friendId, term),
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
    getNextPageParam: ({meta}) => meta?.pagination?.next_page,
  });

  return {friendExpenses: data?.pages[0].data ?? [], isFetching};
};
