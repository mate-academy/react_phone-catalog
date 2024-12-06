const baseUrl = `https://vneholiuk.github.io/react_phone-catalog/`;

export const getData = async <T>(url: string): Promise<T> => {
  const responce = await fetch(baseUrl + url);

  return responce.json();
};
