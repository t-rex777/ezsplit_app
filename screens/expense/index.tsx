import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Chip, IconButton, Text, TextInput} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';

interface IIndexProps {}

const ExpensePage = ({}: IIndexProps): JSX.Element => {
  const [expenseWith, setExpenseWith] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOpenCalendar = () => {
    setOpen(true);
  };

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  return (
    <View>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Add Expense" />
          <Appbar.Action icon="check" />
        </Appbar.Header>
      </View>

      <View style={style.container}>
        <View style={style.expenseWith}>
          <Text variant="titleMedium">With you and: </Text>

          <TextInput
            style={style.expenseWithTextInput}
            mode="outlined"
            placeholder="Enter names, emails, phone numbers..."
            value={expenseWith}
            onChangeText={text => setExpenseWith(text)}
          />
        </View>
      </View>

      <View style={style.container}>
        <View style={style.categoryContainer}>
          <Chip
            icon="chart-bubble"
            style={style.categoryChip}
            onPress={() => console.log('Pressed')}>
            Grocery
          </Chip>
          <Chip
            icon="chart-bubble"
            style={style.categoryChip}
            onPress={() => console.log('Pressed')}>
            Self Care
          </Chip>
          <Chip
            icon="chart-bubble"
            style={style.categoryChip}
            onPress={() => console.log('Pressed')}>
            Dining out
          </Chip>
          <Chip
            icon="chart-bubble"
            style={style.categoryChip}
            onPress={() => console.log('Pressed')}>
            Clothes
          </Chip>
          <Chip
            icon="chart-bubble"
            style={style.categoryChip}
            onPress={() => console.log('Pressed')}>
            Rent
          </Chip>
          <Chip
            icon="chart-bubble"
            style={style.categoryChip}
            onPress={() => console.log('Pressed')}>
            Others
          </Chip>
        </View>

        <TextInput
          style={style.expenseWithTextInput}
          mode="outlined"
          placeholder="Enter a description"
          value={expenseWith}
          onChangeText={text => setExpenseWith(text)}
        />

        <TextInput
          style={style.expenseWithTextInput}
          mode="outlined"
          placeholder="00.00"
          keyboardType="numeric"
          value={expenseWith}
          onChangeText={text => setExpenseWith(text)}
        />

        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />

        <View style={style.calendar}>
          <IconButton
            icon="calendar-month"
            size={20}
            onPress={handleOpenCalendar}
          />

          <Text variant="bodyMedium">{dayjs().format('DD-MM-YYYY')}</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
  },
  expenseWith: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryChip: {
    width: 125,
    margin: 4,
  },
  calendar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  dateText: {width: '100%'},
  expenseWithTextInput: {
    // width: 200
  },
});

export {ExpensePage};
