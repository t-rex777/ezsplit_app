import {EZSPLIT_API_URL} from '@env';
import axios, {Method} from 'axios';
import * as AxiosLogger from 'axios-logger';

interface IClientParams {
  namespace: string;
  headers?: Record<string, any>;
}

export class Client {
  namespace?: string;
  headers?: Record<string, any> = {};

  constructor({namespace, headers}: IClientParams) {
    this.namespace = namespace;

    this.headers = headers;
  }

  async instance(method: Method, resource: string, data = {}) {
    try {
      const axiosInstance = axios.create({
        baseURL:
          EZSPLIT_API_URL +
          (EZSPLIT_API_URL.endsWith('/') ? '' : '/') +
          this.namespace,
        headers: this.headers,
      });

      axiosInstance.interceptors.request.use(
        AxiosLogger.requestLogger,
        AxiosLogger.errorLogger,
      );

      axiosInstance.interceptors.response.use(
        AxiosLogger.responseLogger,
        AxiosLogger.errorLogger,
      );

      return await axiosInstance.request({
        method,
        url: resource.indexOf('/') !== 0 ? '/' + resource : resource,
        data,
      });
    } catch (error: any) {
      console.error('Error:', error); // Log the entire error object
      //   if (error.response) {
      //     console.log('Data:', error.response.data);
      //     console.log('Status:', error.response.status);
      //     console.log('Headers:', error.response.headers);
      //   } else if (error.request) {
      //     console.log('Request:', error.request);
      //   } else {
      //     console.log('Message:', error.message);
      //   }
      //   console.log('Config:', error.config);
      throw error;
    }
  }

  async get(resource: string) {
    return await this.instance('get', resource);
  }

  async find(resource: string, resourceId: string, options = {}) {
    const queryParams = new URLSearchParams(options);

    return await this.instance(
      'get',
      `${resource}/${resourceId}?${queryParams.toString()}`,
    );
  }

  async post(resource: string, data = {}) {
    return await this.instance('post', resource, data);
  }

  async put(resource: string, resourceId: string, data = {}) {
    return await this.instance('put', `${resource}/${resourceId}`, data);
  }

  async patch(resource: string, resourceId: string, data = {}) {
    return await this.instance('patch', `${resource}/${resourceId}`, data);
  }

  async delete(resource: string, resourceId: string) {
    return await this.instance('delete', `${resource}/${resourceId}`);
  }
}
