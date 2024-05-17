export enum DataTypes {
  products = 'products',
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}

export const getData = (querie: DataTypes) => {
  return fetch(`/api/${querie}.json`).then(response => response.json());
};
