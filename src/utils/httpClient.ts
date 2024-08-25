const API_ENDPOINT = `api`;

export function getData<T>(url: string): Promise<T> {
  return fetch(API_ENDPOINT + url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }
    return response.json();
  });
}
