import {AxiosResponse} from 'axios';
import {Client} from './client';

export interface ICategory {
  id: string;
  name: string;
  image: string;
  createdAt: string;
}

export class Category extends Client {
  constructor(headers?: Record<string, any>) {
    super({namespace: 'api/category', headers});
  }

  async all(): Promise<AxiosResponse<{data: ICategory[]}>> {
    try {
      const response = await this.get('');
      return response;
    } catch (error) {
      console.error(error);

      throw new Error('Could not fetch all categories');
    }
  }
}
