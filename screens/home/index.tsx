/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ColorValue} from 'react-native';
import {Avatar} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme';
import {AccountScreen} from '../account';
import {ActivityScreen} from '../activity';
import {FriendScreen} from '../friend';
import GroupScreen from '../group';

interface IHomeProps {}

const Tab = createMaterialBottomTabNavigator();

const GroupTabIcon = ({
  color,
  icon,
}: {
  color: number | ColorValue;
  icon: string;
}) => <MaterialCommunityIcons name={icon} color={color} size={26} />;

const HomeScreen = ({}: IHomeProps): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Groups"
        component={GroupScreen}
        options={{
          tabBarIcon: props => <GroupTabIcon icon="account-group" {...props} />,
        }}
      />

      <Tab.Screen
        name="Friends"
        component={FriendScreen}
        options={{
          tabBarIcon: props => <GroupTabIcon icon="account" {...props} />,
        }}
      />

      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: props => (
            <GroupTabIcon icon="chart-timeline-variant-shimmer" {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => (
            <Avatar.Text size={26} color={theme.colors.surface} label="MS" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export {HomeScreen};