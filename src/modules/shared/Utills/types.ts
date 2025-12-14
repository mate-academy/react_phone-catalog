export type ProductFullInfo = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: [];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: [];
  color: string;
  images: [];
  description: [{}];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: [];
};

export type ProductInfo = {
  id: string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};
