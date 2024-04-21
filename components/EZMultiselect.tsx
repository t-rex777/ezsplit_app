import React, {useCallback, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {View} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import {theme} from '../theme';
import {IEZSelectProps} from './EZSelect';
import {IOption} from './helpers/input';

interface IEZMultiselectProps extends Omit<IEZSelectProps, 'onChange'> {
  onChange?: (value: IOption[]) => void;
}

/**
 * ! should be wrapped inside FormProvider
 */
const EZMultiSelect = ({
  onChange,
  options,
  searchable,
  name,
  error = '',
  placeholder,
  label,
}: IEZMultiselectProps): JSX.Element => {
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);

  const {setValue: setFormValue} = useFormContext();

  const handleChange = useCallback(
    (selectedOptions: ItemType<string>[]) => {
      const _options = selectedOptions.map(option => ({
        label: option.label ?? '',
        value: option.value ?? '',
      }));

      setFormValue(name, _options);

      onChange?.(_options);
    },
    [name, onChange, setFormValue],
  );

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text variant="titleMedium">{label}</Text>

      <DropDownPicker
        zIndex={30000}
        searchable={searchable}
        placeholder={placeholder}
        zIndexInverse={1000000}
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        multiple={true}
        mode="BADGE"
        onSelectItem={handleChange}
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
      />

      {error.length > 0 && (
        <Text variant="labelSmall" style={{color: theme.colors.error}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export {EZMultiSelect};
