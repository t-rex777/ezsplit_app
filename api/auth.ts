import {AxiosResponse} from 'axios';
import {resetGenericPassword, setGenericPassword} from 'react-native-keychain';
import {INavigationProps} from '../components/PageNavigator';
import {Client} from './client';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  image: string;
  dob: string;
  currency: string;
  groupId: number;
}

export class AuthModel extends Client {
  navigation: INavigationProps['navigation'] | undefined = undefined;

  constructor(navigation: INavigationProps['navigation']) {
    super({namespace: 'api/users', headers: {}});

    this.navigation = navigation;
  }

  async all(): Promise<AxiosResponse> {
    return await this.get('');
  }

  async login({email, password}: ILoginParams): Promise<AxiosResponse> {
    try {
      const response = await this.post('login', {
        email,
        password,
      });

      if (response.status === 200) {
        await setGenericPassword(email, password);

        this.navigation?.navigate?.('Home');
      }

      return response;
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  }

  async register(data: IUserRegister): Promise<AxiosResponse> {
    return await this.post('register', data);
  }

  async logout(): Promise<AxiosResponse> {
    resetGenericPassword();
    this.navigation?.navigate?.('SignIn');

    return {status: 200} as any;
  }
}
