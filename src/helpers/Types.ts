/* export type Product = {
  id: string,
  category: string,
  phoneId: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: ,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string,
};
*/

export enum PageType {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
  Favorites = 'favorites',
  Cart = 'cart',
}

export type Product = {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
};
