type Capacity = `${number}GB` | `${number}TB` | `${number}mm`;

interface ProductDetailDescriptions {
  capacityAvailable: Array<Capacity>;
  capacity: Capacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Array<string>;
  color: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: Capacity;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ProductDetail extends ProductDetailDescriptions {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  images: string[];
  description: [
    {
      title: string;
      text: string[];
    },
  ];
}
