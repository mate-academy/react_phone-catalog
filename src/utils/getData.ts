const BASE_URL = import.meta.env.BASE_URL;

export function getData<T>(url: string): Promise<T> {
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  const rawPath = `${BASE_URL}/api/${cleanUrl}.json`;

  const cleanPath = rawPath.replace(/\/+/g, '/');

  return fetch(rawPath).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}
