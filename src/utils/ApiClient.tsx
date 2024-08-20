export enum DataTypes {
  products = 'products',
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}

const BASE_URL = `https://kachvl.github.io/react_phone-catalog`;

export const getData = (querie: DataTypes) => {
  return fetch(BASE_URL + `/api/${querie}.json`).then(response =>
    response.json(),
  );
};
