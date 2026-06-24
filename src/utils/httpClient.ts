export function getData<T>(url: string): Promise<T> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load data from ${url}`);
    }

    return res.json();
  });
}
