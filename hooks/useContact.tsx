import {useQuery} from '@tanstack/react-query';
import {Contact} from '../api/contact';
import {useModel} from './helper';
import {IUser} from './useCurrentUser';

interface IContactContext {
  contacts: IUser[];
  isLoading: boolean;
}

export const contactQueryKey = () => {
  return ['contact'];
};

export const useContacts = (): IContactContext => {
  const ContactModel = useModel(Contact);

  const {data, isFetching} = useQuery({
    queryKey: contactQueryKey(),
    queryFn: async () => {
      const response = await (await ContactModel).all();

      if (response.status !== 200) {
        throw new Error('could not fetch contacts');
      }

      return response.data.data;
    },
  });

  return {
    contacts: data ?? [],
    isLoading: isFetching,
  };
};
