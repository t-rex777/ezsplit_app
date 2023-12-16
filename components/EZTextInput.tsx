import React from 'react';
import {
  Control,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import {KeyboardTypeOptions, StyleProp, View, ViewStyle} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {theme} from '../theme';

interface ITextInputProps {
  name: string;
  style?: StyleProp<ViewStyle>;
  error?: string;
  placeholder: string;
  mode?: 'flat' | 'outlined';
  control: Control<any, any>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
}

function EZTextInput({
  name,
  error = '',
  control,
  placeholder,
  rules,
  mode = 'outlined',
  keyboardType,
  multiline,
}: ITextInputProps): JSX.Element {
  const {field} = useController({
    control,
    name,
    rules,
    defaultValue: '',
  });

  return (
    <View>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        outlineColor={
          error.length > 0 ? theme.colors.error : theme.colors.primary
        }
        mode={mode}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
      />

      {error.length > 0 && (
        <Text variant="labelSmall" style={{color: theme.colors.error}}>
          {error}
        </Text>
      )}
    </View>
  );
}

export {EZTextInput};
