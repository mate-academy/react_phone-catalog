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
  get: async <T>(url: string) => {
    const data = fetchData<T>(url);
    const delay = new Promise(resolve => setTimeout(resolve, 1200));

    await Promise.allSettled([data, delay]);

    return data;
  },
};
