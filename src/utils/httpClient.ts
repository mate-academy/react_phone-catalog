export function getData(url: string) {
  return fetch(`./api/${url}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}
