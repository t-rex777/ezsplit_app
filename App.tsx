/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Group from './screens/group';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const GroupTabIcon = ({color}) => (
    <MaterialCommunityIcons name="account-group" color={color} size={26} />
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator>
        <Stack.Screen name="Group" component={Group} />
      </Stack.Navigator> */}
        <Tab.Navigator>
          <Tab.Screen
            name="Groups"
            component={Group}
            options={{
              tabBarIcon: GroupTabIcon,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
