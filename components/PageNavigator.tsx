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
import {ExpensePage} from '../screens/addExpense';
import {FriendExpenses} from '../screens/friendExpenses';
import {HomeScreen} from '../screens/home';
import {LoadingPage} from '../screens/loadingPage';
import {SignInPage} from '../screens/signin';
import {Toast} from './Toast';

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
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  useEffectOnce(() => {
    if (!isAuthenticated) {
      return;
    }

    (async () => {
      setLoading(true);
      const cred = (await Keychain.getGenericPassword()) as any;

      try {
        if (cred !== false) {
          const token = JSON.parse(cred.password).__rtoken;

          const response = await new AuthModel({
            authorization: `Bearer ${token}`,
          }).refresh();

          if (response.status === 401) {
            await Keychain.resetGenericPassword();
            setIsAuthenticated(false);
            return;
          }

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  });

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <Toast />

      <NavigationContainer>
        <Stack.Navigator>
          {isLoading ? (
            <Stack.Screen
              name="Loading"
              component={LoadingPage}
              options={{headerShown: false}}
            />
          ) : (
            <>
              {isAuthenticated ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="Expense"
                    component={ExpensePage as any}
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export {PageNavigator};
