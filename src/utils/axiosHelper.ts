import axios, { AxiosProgressEvent } from 'axios';

export const BASE_URL = './api';

export interface RequestOptions {
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void,
}

export function request<T>(
  url: string,
  options?: RequestOptions,
): Promise<T> {
  return axios.get(
    `${BASE_URL}/${url}`,
    {
      onDownloadProgress: options?.onDownloadProgress,
    },
  )
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
