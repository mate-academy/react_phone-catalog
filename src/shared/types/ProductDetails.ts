export type ProductDescriptionBlock = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories'; // якщо категорій більше — розшириш
  namespaceId: string;
  name: string;

  capacityAvailable: string[];
  capacity: string;

  priceRegular: number;
  priceDiscount: number;

  colorsAvailable: string[];
  color: string;

  images: string[];

  description: ProductDescriptionBlock[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];

  camera?: string;
  zoom?: string;
};
