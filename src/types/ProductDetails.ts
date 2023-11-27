export interface ProductDetails {
  camera: string;
  capacity: string;
  capacityAvailable: string[];
  cell: string[];
  color:string;
  colorsAvailable: string[];
  description: Description[];
  id: string;
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
}

interface Description {
  text: string[];
  title: string;
}
