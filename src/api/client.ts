export const wait = (delay: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export async function client<T>(url: string, signal?: AbortSignal): Promise<T> {
  await wait(500);

  const response = await fetch(url, { signal } as ResponseInit);

  if (!response.ok) {
    throw new Error(`API_ERROR:${response.status}`);
  }

  return response.json();
}
