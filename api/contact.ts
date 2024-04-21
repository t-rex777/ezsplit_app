import {AxiosResponse} from 'axios';
import {IUser} from '../hooks/useCurrentUser';
import {Client} from './client';

export class Contact extends Client {
  constructor(headers?: Record<string, any>) {
    super({namespace: 'api/users', headers});
  }

  async all(): Promise<AxiosResponse<{data: IUser[]}>> {
    try {
      const response = await this.get('all');
      return response;
    } catch (error) {
      console.error(error);

      throw new Error('Could not fetch all contacts');
    }
  }
}
