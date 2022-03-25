const mainUrl = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const requestAll = () => {
  return fetch(`${mainUrl}.json`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};

export const requestSpecific = (id: string) => {
  return fetch(`${mainUrl}/${id}.json`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};
