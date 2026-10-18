const cache = new Map<string, Promise<unknown>>();

export function getJson<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    const request = fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        cache.delete(url);

        throw error;
      });

    cache.set(url, request);
  }

  return cache.get(url) as Promise<T>;
}
