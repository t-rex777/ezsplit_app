import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  QueryKey,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useMemo} from 'react';
import * as Keychain from 'react-native-keychain';
import {AuthModel} from '../api/auth';
import {useAuth} from '../components/PageNavigator';
import {ISignInPageForm} from '../screens/signin';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  dob: string;
  image: string;
  currency: string;
  groupId: number | null;
  createdAt: string;
}

interface ICurrentUser {
  user: IUser;
  isFetching?: boolean;
  signIn: (formData: ISignInPageForm) => Promise<void>;
  logout: UseMutationResult<void, Error, void, unknown>;
}

export const userQueryKey = (): QueryKey => ['current-user'];

export const useCurrentUser = (
  navigation: NavigationProp<ParamListBase>,
): ICurrentUser => {
  const authModel = useMemo(async () => {
    const key = await Keychain.getGenericPassword();

    const header =
      key !== false
        ? {authorization: 'Bearer ' + JSON.parse(key.password).__token}
        : undefined;

    return new AuthModel(header);
  }, []);

  const auth = useAuth();
  const queryClient = useQueryClient();

  const {data, isFetching} = useQuery({
    queryKey: userQueryKey(),
    queryFn: async () => {
      const response = await (await authModel).find();

      if (response.status === 404 || response.status === 401) {
        navigation?.navigate('SignIn');
      }

      return response.data.user;
    },
  });

  const signIn = async (formData: ISignInPageForm) => {
    const response = await (await authModel).login(formData);

    if (response.status === 200) {
      await queryClient.setQueryData(userQueryKey(), response.data.user);

      auth?.setIsAuthenticated(true);
      navigation.navigate('Home');
    }
  };

  const logout = useMutation({
    mutationKey: userQueryKey(),
    mutationFn: async () => {
      await (await authModel).logout();
      await queryClient.setQueryData(userQueryKey(), null);

      auth?.setIsAuthenticated(false);
      navigation?.navigate('SignIn');
    },
  });

  return {user: data as IUser, isFetching, signIn, logout};
};
