import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthModel} from '../../api/auth';
import {EZTextInput} from '../../components/EZTextInput';
import {INavigationProps} from '../../components/PageNavigator';

interface ISignInPageProps extends INavigationProps {}

export interface ISignInPageForm {
  email: string;
  password: string;
}

const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

const SignInPage = ({navigation}: ISignInPageProps): JSX.Element => {
  const [secure, setSecure] = React.useState(true);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<ISignInPageForm>({
    mode: 'onChange',
    defaultValues: {
      email: 'dev@dev.com',
      password: 'password123',
    },
  });

  const handleExpense: SubmitHandler<ISignInPageForm> = React.useCallback(
    async data => await new AuthModel(navigation).login(data),
    [navigation],
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

      <Button
        mode="contained"
        icon="login"
        style={style.submitButton}
        onPress={handleSubmit(handleExpense)}>
        Sign In
      </Button>
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
});

export {SignInPage};
