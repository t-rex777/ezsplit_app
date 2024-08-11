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
  defaultValue,
}: IEZSelectProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const [dropdownValue, setDropdownValue] = useState(null);

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
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field}) => {
          setDropdownValue(field.value.value);

          const onSelectItem = (d: any) => {
            handleChange(d);
            return field.onChange(d);
          };

          return (
            <DropDownPicker
              open={open}
              items={options}
              placeholder={placeholder}
              value={dropdownValue}
              searchable={searchable}
              closeAfterSelecting={true}
              closeOnBackPressed={true}
              setOpen={setOpen}
              setValue={setDropdownValue}
              onSelectItem={onSelectItem}
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
