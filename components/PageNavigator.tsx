import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ExpensePage} from '../screens/expense';
import {HomeScreen} from '../screens/home';

export interface INavigationProps {
  navigation: NavigationProp<ParamListBase>;
}

const Stack = createNativeStackNavigator();

const PageNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {PageNavigator};
