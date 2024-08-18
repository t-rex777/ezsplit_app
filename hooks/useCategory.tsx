import {useQuery} from '@tanstack/react-query';
import {Category, ICategory} from '../api/category';
import {userQueryKey} from './useCurrentUser';
import {useModel} from './useModel';

export const userCategoryKey = (id?: string) => {
  if (id !== undefined) {
    return ['category', id, userQueryKey()];
  }

  return ['category', userQueryKey()];
};

interface ICategoryListContext {
  categories: ICategory[];
  isFetching: boolean;
}

export const useCategories = (): ICategoryListContext => {
  const CategoryModel = useModel(Category);

  const {data, isFetching} = useQuery({
    queryKey: userCategoryKey(),
    queryFn: async () => {
      const response = await (await CategoryModel).all();

      if (response.status !== 200) {
        throw new Error('could not fetch categories');
      }

      return response.data.data;
    },
  });

  return {
    categories: data ?? [],
    isFetching,
  };
};
