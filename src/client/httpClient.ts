export const getData = (url: string) => {
  return fetch(url, { method: 'GET' })
    .then((data) => data.json());
};
