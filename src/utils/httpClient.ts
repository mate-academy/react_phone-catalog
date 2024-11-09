import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T, R>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return this.client.post<R>(url, data, config);
  }

  public put<T, R>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return this.client.put<R>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

const apiClient = new ApiClient('/api/');

export default apiClient;
