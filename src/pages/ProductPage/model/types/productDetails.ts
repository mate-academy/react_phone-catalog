export interface IProductDetailsDescription {
  title: string;
  text: string[];
}

export interface ProductDetailsFromServer {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: IProductDetailsDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ProductDetails extends ProductDetailsFromServer {
  favorite: boolean;
  cartItem: boolean;
}
