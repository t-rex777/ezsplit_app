import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext, useContext} from 'react';
import * as Keychain from 'react-native-keychain';

import {useEffectOnce} from 'react-use';
import {AuthModel} from '../api/auth';
import {ExpensePage} from '../screens/expense';
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

export const useAuth = (): IAuthContext | undefined => {
  return useContext(AuthContext);
};

const PageNavigator = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  useEffectOnce(() => {
    (async () => {
      const cred = (await Keychain.getGenericPassword()) as any;

      if (cred !== false) {
        const token = JSON.parse(cred.password).__rtoken;
        const response = await new AuthModel(undefined, {
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
  );
};

export {PageNavigator};
