const BASE_URL = 'api';

type FetchMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function fetchData<T>(
  url: string,
  method: FetchMethods = 'GET',
  data: unknown = null,
): Promise<T> {
  const params: RequestInit = { method };

  if (data) {
    params.body = JSON.stringify(data);
  }

  return fetch(BASE_URL + url, params).then(r => r.json());
}

export const client = {
  get: <T>(url: string) => fetchData<T>(url),
};
