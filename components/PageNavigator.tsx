import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext, useContext} from 'react';
import * as Keychain from 'react-native-keychain';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffectOnce} from 'react-use';
import {AuthModel} from '../api/auth';
import {ExpensePage} from '../screens/expense';
import {FriendExpenses} from '../screens/friendExpenses';
import {HomeScreen} from '../screens/home';
import {SignInPage} from '../screens/signin';

export interface INavigationProps {
  navigation: NavigationProp<ParamListBase>;
}

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Stack = createNativeStackNavigator();

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

const PageNavigator = (): JSX.Element => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        staleTime: undefined,
        retry: true,
      },
    },
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffectOnce(() => {
    (async () => {
      const cred = (await Keychain.getGenericPassword()) as any;

      // eslint-disable-next-line no-console
      console.log({keychainCred: cred});

      if (cred !== false) {
        const token = JSON.parse(cred.password).__rtoken;

        const response = await new AuthModel({
          authorization: `Bearer ${token}`,
        }).refresh();

        if (response.status === 200) {
          await Keychain.setGenericPassword(
            cred.username,
            JSON.stringify({
              __token: response.data.access_token,
              __rtoken: response.data.refresh_token,
            }),
          );
        }

        setIsAuthenticated(true);
      }
    })();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <NavigationContainer>
          <Stack.Navigator>
            {isAuthenticated ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />

                <Stack.Screen
                  name="Expense"
                  component={ExpensePage}
                  options={{headerShown: false}}
                />

                <Stack.Screen
                  name="FriendExpenses"
                  component={FriendExpenses as any}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <Stack.Screen
                name="SignIn"
                component={SignInPage}
                options={{headerShown: false}}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export {PageNavigator};
