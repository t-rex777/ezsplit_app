import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext} from 'react';

import {getGenericPassword} from 'react-native-keychain';
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

const PageNavigator = (): JSX.Element => {
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const checkAuth = async () => {
    return !!(await getGenericPassword());
  };

  // eslint-disable-next-line no-void
  const isAuthenticated = void checkAuth();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const cred = await getGenericPassword();
  //     if (cred !== false) {
  //       setIsAuthenticated(true);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  console.log({isAuthenticated});

  return (
    // <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
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
    // </AuthContext.Provider>
  );
};

export {PageNavigator};
