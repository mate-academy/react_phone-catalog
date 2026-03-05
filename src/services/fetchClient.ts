function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function request<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(url))
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      return res.json();
    });
}

const API_BASE = `${import.meta.env.BASE_URL}api`;

export const client = {
  get: <T>(path: string) => request<T>(`${API_BASE}/${path}.json`),
};
