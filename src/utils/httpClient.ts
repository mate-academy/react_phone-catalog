const BASE_URL = `https://andriy-kostiuk.github.io/react_phone-catalog/`;

export const getData = async <T>(url: string): Promise<T> => {
  const responce = await fetch(BASE_URL + url);

  return responce.json();
};
