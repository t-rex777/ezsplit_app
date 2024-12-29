import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import {Button, Text} from 'react-native-paper';
import {EZTextInput} from '../../components/EZTextInput';
import {INavigationProps} from '../../components/PageNavigator';
import {useCurrentUser} from '../../hooks/useCurrentUser';
import {theme} from '../../theme';

interface ISignInPageProps extends INavigationProps {}

export interface ISignInPageForm {
  email: string;
  password: string;
}

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
);

const SignInPage = ({navigation}: ISignInPageProps): JSX.Element => {
  const [secure, setSecure] = React.useState(true);

  const {signIn} = useCurrentUser(navigation, false);

  const isDevMode = Boolean(Config.IS_DEV);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<ISignInPageForm>({
    mode: 'onChange',
    defaultValues: isDevMode
      ? {
          email: 'tester@test.com',
          password: 'password123',
        }
      : {},
  });

  const handleSignIn: SubmitHandler<ISignInPageForm> = React.useCallback(
    async data => {
      await signIn.mutateAsync(data);

      navigation.navigate('Home');
    },
    [navigation, signIn],
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
        onPress={handleSubmit(handleSignIn)}>
        Sign In
      </Button>

      <View style={style.register}>
        <Text>Don't have an account?</Text>
        <Text
          style={style.registerLink}
          onPress={() => navigation.navigate('Register')}>
          Register
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
});

export {SignInPage};
