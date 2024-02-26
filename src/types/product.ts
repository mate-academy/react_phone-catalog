export enum CategoryName {
  phone = 'phones',
  tablet = 'tablets',
  accessory = 'accessories',
}

export type Product = {
  age: number,
  category: CategoryName,
  id: string,
  itemId: string,
  image: string,
  images: string[],
  name: string
  snippet: string,
  price: number,
  fullPrice: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
  color: string,
  year: number,
};

export type NewProduct = Omit<Product, 'price'>;

export type ProductDescription = {
  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  color: string,
  colorsAvailable: string[],
  images: string[],
  description: { title: string, text: string[] }[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[]
};

export type Category = {
  id: number;
  title: string;
  img: string;
  category: CategoryName;
};
