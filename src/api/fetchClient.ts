/* eslint-disable @typescript-eslint/no-explicit-any */

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function request<T>(url: string): Promise<T> {
  await wait(300);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data from server');
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
