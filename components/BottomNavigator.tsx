import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Group from '../screens/group';

const GroupTabIcon = ({color}) => (
  <MaterialCommunityIcons name="account-group" color={color} size={26} />
);

const BottomNavigator = (): JSX.Element => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Group}
        options={{tabBarIcon: GroupTabIcon}}
      />

      <Tab.Screen
        name="Settings"
        component={Group}
        options={{tabBarIcon: GroupTabIcon}}
      />
    </Tab.Navigator>
  );
};

export {BottomNavigator};
