import React from 'react';
import {ColorValue} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupScreen from '../screens/group';

const GroupTabIcon = ({color}: {color: number | ColorValue}) => (
  <MaterialCommunityIcons name="account-group" color={color} size={26} />
);

const BottomNavigator = (): JSX.Element => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={GroupScreen}
        options={{tabBarIcon: GroupTabIcon}}
      />

      <Tab.Screen
        name="Settings"
        component={GroupScreen}
        options={{tabBarIcon: GroupTabIcon}}
      />
    </Tab.Navigator>
  );
};

export {BottomNavigator};
