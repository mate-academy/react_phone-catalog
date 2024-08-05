export const httpRequest = <T>(url: string): Promise<T> => {
  return fetch(url).then(responce => {
    return responce.json() as Promise<T>;
  });
};
