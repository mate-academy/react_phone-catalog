export enum ProductType {
  PHONES = 'phones',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
}

export type Product = {
  id: string,
  category: ProductType,
  phoneId: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string
};

export type Article = {
  title: string,
  text: string,
};

export type ProductDetails = {
  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
  color: string,
  images: string[],
  description: Article[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
};
