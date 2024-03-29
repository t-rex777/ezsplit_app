import {AxiosResponse} from 'axios';
import {Client} from './client';

interface IExpense {
  user_id: number;
  amount: string;
  is_lender: boolean;
}

interface ICreateFriendExpenseParams {
  name: string;
  categoryId: number;
  description: string;
  currency: string;
  totalAmount: string;
  image: string;
  expenses: IExpense[];
}

interface IUpdateFriendExpenseParams extends ICreateFriendExpenseParams {
  id: string;
}

export interface IFriendExpense {
  id: string;
  imageUrl: string;
  name: string;
  totalAmount: string;
  isLender: boolean;
  currency: string;
}

export class FriendExpense extends Client {
  constructor(headers?: Record<string, any>) {
    super({namespace: 'api/expenses/user', headers});
  }

  async all(): Promise<AxiosResponse<{data: IFriendExpense[]}>> {
    try {
      return await this.get('');
    } catch (error) {
      console.error(error);

      throw new Error('Could not fetch all friend"s expenses');
    }
  }

  async find(friendId: string): Promise<AxiosResponse<any>> {
    try {
      return await this.find(friendId);
    } catch (error) {
      console.error(error);

      throw new Error(`Could not fetch user id ${friendId} expenses`);
    }
  }

  async create(data: ICreateFriendExpenseParams): Promise<AxiosResponse<any>> {
    try {
      return await this.post('create', data);
    } catch (error) {
      console.error(error);

      throw new Error(`Could not create expense ${data.name}`);
    }
  }

  async update({
    id,
    ...data
  }: IUpdateFriendExpenseParams): Promise<AxiosResponse<any>> {
    try {
      return await this.put('update', id, data);
    } catch (error) {
      console.error(error);

      throw new Error(`Could not update expense ${data.name}`);
    }
  }

  async remove(id: string): Promise<AxiosResponse<any>> {
    try {
      return await this.delete('delete', id);
    } catch (error) {
      console.error(error);

      throw new Error(`Could not delete expense ${id}`);
    }
  }
}
