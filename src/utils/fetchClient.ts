function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(url: string, method: string): Promise<T> {
  const options: RequestInit = { method };

  return wait(500)
    .then(() => fetch(url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong with API!');
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
};
