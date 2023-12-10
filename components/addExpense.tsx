import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

interface IAddExpenseProps {}

const AddExpense = ({}: IAddExpenseProps): JSX.Element => {
  return (
    <View style={style.container}>
      <Button
        icon="clipboard-list-outline"
        mode="contained"
        style={style.button}
        dark
        onPress={() => console.log('Pressed')}>
        Add Expense
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  button: {
    borderRadius: 20,
  },
});

export {AddExpense};
