import dayjs from 'dayjs';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {IUserRegister} from '../../api/auth';
import {EZTextInput} from '../../components/EZTextInput';
import {INavigationProps} from '../../components/PageNavigator';
import {useCurrentUser} from '../../hooks/useCurrentUser';
import {theme} from '../../theme';
import {PASSWORD_REGEX} from '../signin';

const RegisterScreen = ({navigation}: INavigationProps): JSX.Element => {
  const [secure, setSecure] = React.useState(true);

  const {register} = useCurrentUser(navigation, false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<IUserRegister & {dob: Date}>({
    mode: 'onChange',
  });

  const handleRegister: SubmitHandler<IUserRegister> = React.useCallback(
    async data => {
      await register.mutateAsync(data);
    },
    [register],
  );

  const [dob] = watch(['dob']);

  const [openCalendar, setOpenCalendar] = React.useState(false);

  const handleOpenCalendar = React.useCallback(() => {
    setOpenCalendar(true);
  }, []);

  const handleCloseCalendar = React.useCallback(() => {
    setOpenCalendar(false);
  }, [setOpenCalendar]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpenCalendar(false);
      setValue('dob', params.date);
    },
    [setValue],
  );

  return (
    <View style={style.container}>
      <EZTextInput
        rules={{
          validate: (v: string) => (v.length > 0 ? true : 'Required field'),
        }}
        name="email"
        control={control}
        error={errors.email?.message}
        mode="outlined"
        placeholder="Enter username"
      />

      <EZTextInput
        name="password"
        control={control}
        error={errors.password?.message}
        mode="outlined"
        placeholder="Enter password"
        secureTextEntry={secure}
        rightIcon="eye"
        onRightIconPress={() => setSecure(!secure)}
        rules={{
          validate: (v: string) => {
            return PASSWORD_REGEX.test(v)
              ? true
              : 'Minimum six characters, at least one letter and one number';
          },
        }}
      />

      <Text variant="titleMedium">Date of birth</Text>

      <TouchableOpacity style={style.calendar} onPress={handleOpenCalendar}>
        <IconButton icon="calendar-month" size={20} />

        <Text variant="bodyMedium">{dayjs(dob).format('DD-MM-YYYY')}</Text>

        <DatePickerModal
          disableStatusBar={false}
          disableStatusBarPadding
          locale="en"
          mode="single"
          visible={openCalendar}
          onDismiss={handleCloseCalendar}
          date={dob}
          onConfirm={onConfirmSingle}
          disableSafeTop
        />
      </TouchableOpacity>

      <Button
        mode="contained"
        icon="login"
        style={style.submitButton}
        onPress={handleSubmit(handleRegister)}>
        Register
      </Button>

      <View style={style.register}>
        <Text>Already have an account?</Text>
        <Text
          style={style.registerLink}
          onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 8,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 16,
  },
  submitButton: {borderRadius: 5},
  register: {
    display: 'flex',
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  registerLink: {
    textDecorationLine: 'underline',
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  calendar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 5,
  },
});

export {RegisterScreen};
