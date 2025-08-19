function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function request<T>(url: string): Promise<T> {
  return wait(300)
    .then(() => fetch(url))
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
