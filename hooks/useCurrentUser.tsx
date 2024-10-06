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
import {AuthModel, IUserRegister} from '../api/auth';
import {useAuth} from '../components/PageNavigator';
import {useToast} from '../components/Toast';
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
  signIn: UseMutationResult<any, Error, ISignInPageForm, unknown>;
  logout: UseMutationResult<void, Error, void, unknown>;
  register: UseMutationResult<any, Error, IUserRegister, unknown>;
}

export const userQueryKey = (): QueryKey => ['current-user'];

export const useCurrentUser = (
  navigation: NavigationProp<ParamListBase>,
  enabled = true,
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
  const toast = useToast();

  const {data, isFetching} = useQuery({
    enabled,
    queryKey: userQueryKey(),
    queryFn: async () => {
      const response = await (await authModel).find();

      if (response.status === 404 || response.status === 401) {
        navigation?.navigate('SignIn');
      }

      return response.data.user;
    },
  });

  const signIn = useMutation({
    mutationFn: async (formData: ISignInPageForm) => {
      const response = await (await authModel).login(formData);
      return response.data;
    },
    onSuccess: response => {
      queryClient.setQueryData(userQueryKey(), response.user);

      toast.addMessage(response.user.name + ' logged in successfully!');

      auth?.setIsAuthenticated(true);
      navigation.navigate('Home');
    },
    onError: response => {
      console.error('Mutation failed');

      toast.addMessage('User not found');

      console.error(response);

      queryClient.setQueryData(userQueryKey(), null);
    },
  });

  const register = useMutation({
    mutationFn: async (formData: IUserRegister) => {
      const response = await (await authModel).register(formData);
      return response.data;
    },
    onSuccess: () => {
      auth?.setIsAuthenticated(false);
      navigation?.navigate('SignIn');
    },
  });

  const logout = useMutation({
    mutationKey: userQueryKey(),
    mutationFn: async () => {
      await (await authModel).logout();
    },
    onSuccess: async () => {
      await queryClient.setQueryData(userQueryKey(), null);

      auth?.setIsAuthenticated(false);
      navigation?.navigate('SignIn');
    },
  });

  return {user: data as IUser, isFetching, signIn, logout, register};
};
