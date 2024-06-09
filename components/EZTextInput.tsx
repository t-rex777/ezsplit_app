import React from 'react';
import {useController} from 'react-hook-form';
import {KeyboardTypeOptions, StyleProp, View, ViewStyle} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {theme} from '../theme';
import {IInputProps} from './helpers/input';

interface ITextInputProps extends IInputProps<string> {
  style?: StyleProp<ViewStyle>;
  mode?: 'flat' | 'outlined';
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  secureTextEntry?: boolean;
  rightIcon?: IconSource;
  onRightIconPress?: () => void;
}

function EZTextInput({
  name,
  error = '',
  control,
  placeholder,
  rules,
  label,
  mode = 'outlined',
  keyboardType,
  multiline,
  secureTextEntry = false,
  rightIcon: RightIcon,
  onRightIconPress,
}: ITextInputProps): JSX.Element {
  const {field} = useController({
    control,
    name,
    rules,
    defaultValue: '',
  });

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text variant="titleMedium">{label}</Text>

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
        secureTextEntry={secureTextEntry}
        right={
          RightIcon ? (
            <TextInput.Icon onPress={onRightIconPress} icon={RightIcon} />
          ) : undefined
        }
        style={{paddingTop: multiline ? 12 : 0}}
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
