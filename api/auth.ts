import {AxiosResponse} from 'axios';
import * as Keychain from 'react-native-keychain';
import {IUser} from '../hooks/useCurrentUser';
import {Client} from './client';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  image: string;
  dob: string;
  currency: string;
  groupId?: number;
}

export class AuthModel extends Client {
  constructor(headers?: Record<string, any>) {
    super({namespace: 'api/users', headers});
  }

  async find(): Promise<AxiosResponse<ILoginResponse>> {
    return await this.get('current');
  }

  async login({email, password}: ILoginParams): Promise<AxiosResponse> {
    try {
      const response = await this.post('login', {
        email,
        password,
      });

      if (response.status === 200) {
        await Keychain.setGenericPassword(
          email,
          JSON.stringify({
            __token: response.data.access_token,
            __rtoken: response.data.refresh_token,
          }),
        );
      }

      return response;
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  }

  async register(data: IUserRegister): Promise<AxiosResponse> {
    try {
      const options = Object.assign({}, data, {
        image: '',
        currency: 'INR',
      });

      return await this.post('register', options);
    } catch (error) {
      console.error(error);
      throw new Error('Could not register user');
    }
  }

  async logout(): Promise<AxiosResponse> {
    Keychain.resetGenericPassword();

    return {status: 200} as any;
  }

  async refresh(): Promise<AxiosResponse> {
    return await this.post('refresh');
  }
}
