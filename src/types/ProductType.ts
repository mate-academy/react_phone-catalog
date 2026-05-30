export interface ProductType {
  id: string;
  category: string;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  resolution: string;
  description: [
    {
      title: string;
      text: string[];
    },
  ];
  camera: string;
  zoom: string;
  cell: string[];
}
