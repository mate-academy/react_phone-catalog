const cache = new Map<string, Promise<unknown>>();
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const request = async <T>(url: string): Promise<T> => {
  if (!cache.has(url)) {
    cache.set(
      url,
      (async () => {
        await delay(500);

        const response = await fetch(`${import.meta.env.BASE_URL}/api${url}`);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })().catch(error => {
        cache.delete(url);
        throw error;
      }),
    );
  }

  return cache.get(url) as Promise<T>;
};
