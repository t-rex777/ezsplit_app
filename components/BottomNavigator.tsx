import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Group from '../screens/group';

const BottomNavigator = (): JSX.Element => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Group} />
      <Tab.Screen name="Settings" component={Group} />
    </Tab.Navigator>
  );
};

export {BottomNavigator};
