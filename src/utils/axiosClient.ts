import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(url: string, data: any) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async patch<T>(url: string, data: any) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
