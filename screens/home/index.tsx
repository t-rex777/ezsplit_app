import React from 'react';
import {ColorValue} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupScreen from '../group';

interface IHomeProps {}

const Tab = createMaterialBottomTabNavigator();

const GroupTabIcon = ({color}: {color: number | ColorValue}) => (
  <MaterialCommunityIcons name="account-group" color={color} size={26} />
);

const HomeScreen = ({}: IHomeProps): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Groups"
        component={GroupScreen}
        options={{tabBarIcon: GroupTabIcon}}
      />

      {/* <Tab.Screen
        name="Expense"
        component={ExpensePage}
        options={{tabBarIcon: GroupTabIcon}}
      /> */}
    </Tab.Navigator>
  );
};

export {HomeScreen};
