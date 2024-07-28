import {AxiosResponse} from 'axios';
import {Client} from './client';
import {TPaginatedResource} from './types';

interface IExpense {
  user_id: string;
  amount: string;
  is_lender: boolean;
}

export interface ICreateFriendExpenseParams {
  name: string;
  categoryId: string;
  description: string;
  currency: string;
  totalAmount: string;
  image: string;
  expenses: IExpense[];
}

interface IUpdateFriendExpenseParams extends ICreateFriendExpenseParams {
  id: string;
}

export interface IFriendExpenseListItem {
  id: string;
  imageUrl: string;
  name: string;
  totalAmount: string;
  isLender: boolean;
  currency: string;
}

export interface IFriendExpenses {
  id: number;
  name: string;
  description: string;
  currency: string;
  totalAmount: string;
  image: string;
  createdAt: string;
  modifiedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
  };
  users: {
    id: number;
    name: string;
    email: string;
    dob: string;
    image: string;
    currency: string;
    groupId: number | null;
    createdAt: string;
    amount: string;
    isLender: boolean;
  }[];
}

export class FriendExpense extends Client {
  constructor(headers?: Record<string, any>) {
    super({namespace: 'api/expenses/user', headers});
  }

  async all(): Promise<AxiosResponse<{data: IFriendExpenseListItem[]}>> {
    try {
      return await this.get('');
    } catch (error) {
      console.error(error);

      throw new Error("Could not fetch all friend's expenses");
    }
  }

  async findFriendExpenses(
    friendId: string,
    queryParams?: Record<string, any>,
  ): Promise<AxiosResponse<TPaginatedResource<IFriendExpenses>>> {
    try {
      return await this.find('friend', friendId, queryParams);
    } catch (error) {
      console.error(error);

      throw new Error(`Could not fetch user id ${friendId} expenses`);
    }
  }

  async findExpense(
    expenseId: string,
    queryParams?: Record<string, any>,
  ): Promise<AxiosResponse<{data: IFriendExpenses}>> {
    try {
      return await this.find('', expenseId, queryParams);
    } catch (error) {
      console.error(error);

      throw new Error(`Could not fetch expense id ${expenseId} expenses`);
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
      return await this.patch('update', id, data);
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
