import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Button, Chip, IconButton, Text} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {EZTextInput} from '../../components';
import {INavigationProps} from '../../components/PageNavigator';
import {theme} from '../../theme';

interface IExpensePageProps extends INavigationProps {}

interface IExpenseForm {
  expenseWith: string;
  category: TCategory;
  amount: string;
  date: Date;
  description: string;
  notes: string;
}

const DEFAULT_CATEGORY = [
  'grocery',
  'entertainment',
  'dining-out',
  'clothes',
  'rent',
  'others',
] as const;

type TCategory = (typeof DEFAULT_CATEGORY)[number];

const ExpensePage = ({navigation}: IExpensePageProps): JSX.Element => {
  const [openCalendar, setOpenCalendar] = React.useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: {errors},
  } = useForm<IExpenseForm>({
    mode: 'onChange',
    defaultValues: {
      amount: '0.00',
      category: DEFAULT_CATEGORY[0],
      description: '',
      notes: '',
      date: new Date(),
      expenseWith: '',
    },
  });

  const [selectedCategory, date] = useMemo(
    () => watch(['category', 'date']),
    [watch],
  );

  const handleCloseCalendar = React.useCallback(() => {
    setOpenCalendar(false);
  }, [setOpenCalendar]);

  const handleOpenCalendar = React.useCallback(() => {
    setOpenCalendar(true);
  }, []);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpenCalendar(false);
      setValue('date', params.date);
    },
    [setValue],
  );

  const handleExpense: SubmitHandler<IExpenseForm> = React.useCallback(data => {
    console.log({data});
  }, []);

  const handleCategory = React.useCallback(
    (category: TCategory) => {
      setValue('category', category);
    },
    [setValue],
  );

  return (
    <View>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Add Expense" />
          <Appbar.Action icon="check" />
        </Appbar.Header>
      </View>

      <View style={style.container}>
        <View style={style.expenseWith}>
          <Text variant="titleMedium">With you and: </Text>

          <EZTextInput
            rules={{
              validate: (v: string) => (v.length > 0 ? true : 'Required field'),
            }}
            name="expenseWith"
            control={control}
            error={errors.expenseWith?.message}
            mode="outlined"
            placeholder="Enter names, emails, phone numbers..."
          />
        </View>
      </View>

      <View style={style.container}>
        <TouchableOpacity style={style.calendar} onPress={handleOpenCalendar}>
          <IconButton icon="calendar-month" size={20} />

          <Text variant="bodyMedium">{dayjs(date).format('DD-MM-YYYY')}</Text>

          <DatePickerModal
            locale="en"
            mode="single"
            visible={openCalendar}
            onDismiss={handleCloseCalendar}
            date={date}
            onChange={onConfirmSingle}
            onConfirm={onConfirmSingle}
            presentationStyle="fullScreen"
          />
        </TouchableOpacity>

        <View>
          <Text variant="titleMedium">Category</Text>

          <View style={style.categoryChipContainer}>
            {DEFAULT_CATEGORY.map((category, i) => (
              <Chip
                key={i}
                compact
                selected={selectedCategory === category}
                showSelectedOverlay
                showSelectedCheck
                icon={
                  selectedCategory !== category ? 'chart-bubble' : undefined
                }
                style={style.categoryChip}
                onPress={() => handleCategory(category)}>
                {category}
              </Chip>
            ))}
          </View>
        </View>
        <View>
          <Text variant="titleMedium">Description</Text>

          <EZTextInput
            rules={{
              validate: (v: string) => (v.length > 0 ? true : 'Required field'),
            }}
            name="description"
            control={control}
            error={errors.description?.message}
            mode="outlined"
            placeholder="For eg. Fruits and Vegetables"
          />
        </View>
        <View>
          <Text variant="titleMedium">Amount</Text>

          <EZTextInput
            rules={{
              validate: (v: string) =>
                Number(v) >= 1 ? true : 'should be greater than 0',
            }}
            name="amount"
            control={control}
            error={errors.amount?.message}
            mode="outlined"
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text variant="titleMedium">Note</Text>

          <EZTextInput
            name="notes"
            control={control}
            multiline
            error={errors.notes?.message}
            style={style.notes}
            mode="outlined"
            placeholder="For eg. 500gm banana, 1L milk..."
          />
        </View>

        <Button
          mode="contained"
          icon="check"
          style={style.submitButton}
          onPress={handleSubmit(handleExpense)}>
          Add Expense
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
    gap: 12,
  },
  expenseWith: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  categoryChipContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryChip: {
    width: 128,
  },
  calendar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 5,
  },
  dateText: {width: '100%'},
  submitButton: {borderRadius: 5},
  notes: {paddingTop: 5},
});

export {ExpensePage};
