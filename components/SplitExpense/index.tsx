import React from 'react';
import {useController} from 'react-hook-form';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import EZAvatar from '../Avatar';
import {IExpenseOption, IInputProps} from '../helpers/input';

interface ISplitExpense extends Omit<IInputProps<IExpenseOption>, 'onChange'> {
  options: IExpenseOption[];
  onChange: (data: IExpenseOption, index: number) => void;
}

interface IRow extends Omit<IInputProps<IExpenseOption>, 'onChange'> {
  option: IExpenseOption;
  index: number;
  onChange: ISplitExpense['onChange'];
}

const Row = ({option, control, name, index, onChange}: IRow): JSX.Element => {
  const {field} = useController({
    control,
    name,
    defaultValue: option,
  });

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
        }}>
        <EZAvatar image={option.image} label={option.userName} size={32} />

        <Text variant="titleMedium">{option.userName}</Text>
      </View>

      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        onEndEditing={() => onChange({...option, amount: field.value}, index)}
        style={{width: 120, height: 40}}
        mode={'outlined'}
        keyboardType={'decimal-pad'}
        placeholder="0.00"
      />
    </View>
  );
};

const SplitExpense = ({
  control,
  name,
  label,
  options,
  onChange,
}: ISplitExpense): JSX.Element => {
  return (
    <View>
      <Text variant="titleMedium" style={{marginBottom: -16}}>
        {label}
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 4,
        }}>
        {options.map((option, index) => {
          return (
            <Row
              key={index}
              index={index}
              option={option}
              control={control}
              name={`${name}-${index}`}
              onChange={onChange}
            />
          );
        })}
      </View>
    </View>
  );
};

export {SplitExpense};
