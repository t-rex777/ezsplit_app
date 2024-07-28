import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {getAvatarFallbackValue} from '../../utils/fallback';
import EZAvatar from '../Avatar';
import {IExpenseOption, IInputProps} from '../helpers/input';

interface ISplitExpense
  extends Omit<IInputProps<IExpenseOption>, 'onChange' | 'control' | 'name'> {
  options: IExpenseOption[];
  onChange: (data: IExpenseOption, index: number) => void;
}

interface IRow
  extends Omit<IInputProps<IExpenseOption>, 'onChange' | 'control' | 'name'> {
  option: IExpenseOption;
  index: number;
  onChange: ISplitExpense['onChange'];
}

const Row = ({option, index, onChange}: IRow): JSX.Element => {
  const [amount, setAmount] = useState(option.amount);

  useEffect(() => {
    setAmount(option.amount);
  }, [option.amount]);

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
        <EZAvatar
          image={option.image}
          label={getAvatarFallbackValue(option.userName)}
          size={32}
        />

        <Text variant="titleMedium">{option.userName}</Text>
      </View>

      <TextInput
        value={amount}
        onChangeText={setAmount}
        onEndEditing={() => onChange({...option, amount}, index)}
        style={{width: 120, height: 40}}
        mode={'outlined'}
        keyboardType={'decimal-pad'}
        placeholder="0.00"
      />
    </View>
  );
};

const SplitExpense = ({
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
              onChange={onChange}
            />
          );
        })}
      </View>
    </View>
  );
};

export {SplitExpense};
