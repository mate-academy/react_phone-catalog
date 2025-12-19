interface ProductDescription {
  title: string;
  text: string[];
}

export interface Phone {
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
  description: ProductDescription[];
  screen: string;
  resolution: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
