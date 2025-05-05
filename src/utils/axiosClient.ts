// axios docs https://axios-http.com/docs/intro
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
  // application/json is a default Content-Type
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    // no need to run `response.json()` data is already prepared
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
    // if we don't need the response data
    return instance.delete(url);
  },
};
