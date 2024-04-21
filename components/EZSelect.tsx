import React, {useCallback, useState} from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import {theme} from '../theme';
import {IInputProps, IOption} from './helpers/input';

export interface IEZSelectProps extends IInputProps<IOption> {
  options: IOption[];
  searchable?: boolean;
}

const EZSelect = ({
  onChange,
  control,
  name,
  rules,
  searchable,
  options,
  placeholder,
  error = '',
  label,
}: IEZSelectProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (option: ItemType<string>) => {
      if (option.label && option.value) {
        onChange?.({
          label: option.label,
          value: option.value,
        });
      }
    },
    [onChange],
  );

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text variant="titleMedium">{label}</Text>

      <Controller
        name={name}
        defaultValue={null}
        control={control}
        rules={rules}
        render={({field}) => {
          return (
            <DropDownPicker
              open={open}
              items={options}
              placeholder={placeholder}
              value={field.value}
              searchable={searchable}
              closeAfterSelecting={true}
              closeOnBackPressed={true}
              setOpen={setOpen}
              // TODO: not wokring
              setValue={field.onChange}
              onSelectItem={handleChange}
            />
          );
        }}
      />

      {error.length > 0 && (
        <Text variant="labelSmall" style={{color: theme.colors.error}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export {EZSelect};
