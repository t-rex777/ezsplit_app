import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

interface IIndexProps {}

const LoadingPage = ({}: IIndexProps): JSX.Element => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export {LoadingPage};
