import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

export const client = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await instance.get<T>(url, config);

    return response.data;
  },

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    if (typeof data === 'undefined') {
      const response = await instance.post<T>(url);

      return response.data;
    }

    const response = await instance.post<T>(url, data, config);

    return response.data;
  },

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    if (typeof data === 'undefined') {
      const response = await instance.post<T>(url);

      return response.data;
    }

    const response = await instance.post<T>(url, data, config);

    return response.data;
  },

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    if (typeof data === 'undefined') {
      const response = await instance.put<T>(url);

      return response.data;
    }

    const response = await instance.put<T>(url, data, config);

    return response.data;
  },

  async delete(url: string, config?: AxiosRequestConfig) {
    return instance.delete(url, config);
  },
};
