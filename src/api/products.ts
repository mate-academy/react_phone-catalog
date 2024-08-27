export function getProducts<T>(url: string) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  });
}
