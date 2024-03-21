/* eslint-disable @typescript-eslint/indent */
export type Description = {
  title: string;
  text: string[];
};

export interface ProductDetails {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: [string];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export type ProductDetails2 = Omit<
  ProductDetails,
  | 'capacityAvailable'
  | 'colorsAvailable'
  | 'images'
  | 'description'
  | 'cell'
  | 'priceRegular'
  | 'priceDiscount'
>;
