import {RouteProp} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Appbar, Button, Chip, Text} from 'react-native-paper';
import {useEffectOnce} from 'react-use';
import {IFriendExpenseListItem, IFriendExpenses} from '../../api/friendExpense';
import {EZSelect} from '../../components/EZSelect';
import {EZTextInput} from '../../components/EZTextInput';
import {INavigationProps} from '../../components/PageNavigator';
import {SplitExpense} from '../../components/SplitExpense';
import {IExpenseOption, IOption} from '../../components/helpers/input';
import {useCategories} from '../../hooks/useCategory';
import {useCurrentUser} from '../../hooks/useCurrentUser';
import {useFriendExpenses} from '../../hooks/useFriendExpense';
import {theme} from '../../theme';

interface IExpensePageProps extends INavigationProps {
  route: RouteProp<
    {
      ExpensePage: {friend: IFriendExpenseListItem; expense?: IFriendExpenses};
    },
    'ExpensePage'
  >;
}

interface IExpenseForm {
  categoryId: string;
  amount: string;
  date: Date;
  description: string;
  notes: string;
  lender: IOption;
  expenses: IExpenseOption[];
}

interface IUserOption {
  value: string;
  label: string;
}

const ExpensePage = ({navigation, route}: IExpensePageProps): JSX.Element => {
  const {categories} = useCategories();

  const {user} = useCurrentUser(navigation);

  const {friend, expense} = route.params;

  const {
    create,
    isFetching,
    update: updateExpense,
  } = useFriendExpenses(navigation, friend?.id);

  const defaultValue = useMemo<IExpenseForm>(() => {
    return {
      amount: '',
      categoryId: categories[0].id,
      description: '',
      notes: '',
      date: new Date(),
      lender: {
        label: user.name,
        value: user.id,
      },
      expenses: [
        {
          amount: '',
          disabled: false,
          image: user.image,
          selected: false,
          value: user.id,
          userName: user.name,
        },
        {
          amount: '',
          disabled: false,
          image: friend.imageUrl,
          selected: false,
          value: friend.id,
          userName: friend.name,
        },
      ],
    };
  }, [
    categories,
    friend.id,
    friend.imageUrl,
    friend.name,
    user.id,
    user.image,
    user.name,
  ]);

  const defaultExpense = useMemo<IExpenseForm>(() => {
    if (expense === undefined) {
      return defaultValue;
    }

    const lender = expense.users.find(u => u.isLender);

    if (lender === undefined) {
      throw new Error('Lender not found');
    }

    return {
      amount: String(expense.totalAmount),
      categoryId: String(expense.category.id),

      description: expense.name,
      notes: expense.description,
      date: new Date(),
      lender: {
        label: lender.name,
        value: String(lender.id),
      },
      expenses: expense.users.map(u => ({
        amount: u.amount,
        disabled: false,
        image: u.image,
        selected: false,
        value: String(u.id),
        userName: u.name,
      })),
    };
  }, [defaultValue, expense]);

  const form = useForm<IExpenseForm>({
    mode: 'onChange',
    defaultValues: expense === undefined ? defaultValue : defaultExpense,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: {errors},
  } = form;

  const {fields, update} = useFieldArray({
    name: 'expenses',
    control,
  });

  const [selectedCategory, _date] = watch(['categoryId', 'date']);

  // const handleCloseCalendar = React.useCallback(() => {
  //   setOpenCalendar(false);
  // }, [setOpenCalendar]);

  // const handleOpenCalendar = React.useCallback(() => {
  //   setOpenCalendar(true);
  // }, []);

  // const onConfirmSingle = React.useCallback(
  //   (params: any) => {
  //     setOpenCalendar(false);
  //     setValue('date', params.date);
  //   },
  //   [setValue],
  // );

  const submitExpense: SubmitHandler<IExpenseForm> = React.useCallback(
    async ({
      amount,
      categoryId,
      date: _submittingDate,
      description,
      expenses,
      notes,
      lender,
    }) => {
      const totalUserAmounts = expenses.reduce(
        (acc, e) => acc + Number(e.amount),
        0,
      );

      if (totalUserAmounts !== Number(amount)) {
        form.setError('amount', {
          message: 'Sum of individual amounts should be equal to total amount',
        });

        form.setFocus('amount');

        return;
      }

      const expenseArray = expenses.map(e => ({
        user_id: e.value,
        amount: e.amount,
        is_lender: Number(e.value) === Number(lender.value),
      }));

      if (expense === undefined) {
        return await create.mutateAsync({
          categoryId,
          currency: 'INR',
          description: notes,
          expenses: expenseArray,
          image: '',
          name: description,
          totalAmount: amount,
        });
      }

      return updateExpense.mutateAsync({
        expenseId: String(expense.id),
        categoryId,
        currency: 'INR',
        description: notes,
        expenses: expenseArray,
        image: '',
        name: description,
        totalAmount: amount,
      });
    },
    [create, expense, form, updateExpense],
  );

  const handleCategory = React.useCallback(
    (categoryId: string) => {
      setValue('categoryId', categoryId);
    },
    [setValue],
  );

  const userOptions = React.useMemo<IUserOption[]>(() => {
    return [
      {label: friend.name, value: friend.id.toString()},
      {
        label: `${user.name} (You)`,
        value: user.id.toString(),
      },
    ];
  }, [friend.id, friend.name, user.id, user.name]);

  const handleExpenses = useCallback(
    (data: IExpenseOption, index: number) => {
      update(index, data);
    },
    [update],
  );

  const handleAmountChange = useCallback(
    (amount: string) => {
      fields.forEach((field, index) => {
        handleExpenses(
          {
            ...field,
            amount: (Number(amount) / fields.length).toString(),
          },
          index,
        );
      });
    },
    [fields, handleExpenses],
  );

  useEffectOnce(() => {
    handleCategory(String(defaultValue.categoryId));
  });

  return (
    <View>
      <FormProvider {...form}>
        <View>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Add Expense" />
            <Appbar.Action icon="check" onPress={handleSubmit(submitExpense)} />
          </Appbar.Header>
        </View>

        <View style={style.container}>
          <View>
            <EZTextInput
              label="Description"
              rules={{
                validate: (v: string) =>
                  v.length > 0 ? true : 'Required field',
              }}
              name="description"
              control={control}
              error={errors.description?.message}
              mode="outlined"
              placeholder="For eg. Fruits and Vegetables"
            />
          </View>

          <View>
            <EZTextInput
              label="Amount"
              rules={{
                validate: (v: string) => {
                  if (Number(v) < 1) {
                    return 'should be greater than 0';
                  }

                  return true;
                },
              }}
              name="amount"
              control={control}
              error={errors.amount?.message}
              mode="outlined"
              placeholder="0.00"
              keyboardType="numeric"
              onChange={handleAmountChange}
            />
          </View>

          <View>
            <Text variant="titleMedium">Category</Text>

            <View style={style.categoryChipContainer}>
              {categories.map((category, i) => (
                <Chip
                  key={i}
                  compact
                  selected={Number(selectedCategory) === Number(category.id)}
                  showSelectedOverlay
                  showSelectedCheck
                  icon={
                    Number(selectedCategory) !== Number(category.id)
                      ? 'chart-bubble'
                      : undefined
                  }
                  style={style.categoryChip}
                  onPress={() => handleCategory(category.id)}>
                  {category.name}
                </Chip>
              ))}
            </View>
          </View>

          <View>
            <EZSelect
              label="Paid by"
              name="lender"
              control={control}
              options={userOptions}
            />
          </View>

          <View>
            <EZTextInput
              label="Notes"
              name="notes"
              control={control}
              multiline
              error={errors.notes?.message}
              style={style.notes}
              mode="outlined"
              placeholder="For eg. 500gm banana, 1L milk..."
            />
          </View>

          {/* TODO: Add date */}
          {/* <View>
            <Text variant="titleMedium">Date of expense</Text>

            <TouchableOpacity
              style={style.calendar}
              onPress={handleOpenCalendar}>
              <IconButton icon="calendar-month" size={20} />

              <Text variant="bodyMedium">
                {dayjs(date).format('DD-MM-YYYY')}
              </Text>

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
          </View> */}

          <View>
            <Text variant="titleMedium">Split between 2 people</Text>

            <SplitExpense onChange={handleExpenses} options={fields} />
          </View>

          <Button
            mode="contained"
            disabled={isFetching || !form.formState.isValid}
            icon="check"
            style={style.submitButton}
            onPress={handleSubmit(submitExpense)}>
            Add Expense
          </Button>
        </View>
      </FormProvider>
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
