export interface FetchType {
  url: string;
  method: string;
}

export interface ImageFetchType {
  url: string;
  method: string;
  itemId: string;
}

export interface DescType {
  title: string;
  text: string;
}

export interface DataType {
  id: string;
  color: string;
  colorsAvailable: string[];
  images: string[];
  priceRegular: number;
  priceDiscount: number;
  capacityAvailable: string[];
  capacity: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  description: DescType[];
  category: string;
}

export interface ProductType {
  id: number;
  itemId: string;
}

export const getProducts = ({ url, method }: FetchType) => {
  const options: RequestInit = { method };

  return fetch(url, options).then(result => result.json());
};

export const getData = async ({
  url,
  method,
  itemId,
}: ImageFetchType): Promise<DataType> => {
  const options: RequestInit = { method };

  const images = (await fetch(url, options).then(result =>
    result.json(),
  )) as DataType[];

  return images.find(img => img.id === itemId) as DataType;
};

export const getId = async ({
  url,
  method,
  itemId,
}: ImageFetchType): Promise<number> => {
  const options: RequestInit = { method };

  const images = (await fetch(url, options).then(result =>
    result.json(),
  )) as ProductType[];

  return (images.find(img => img.itemId === itemId) as ProductType).id;
};
