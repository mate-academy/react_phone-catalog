export type ProductCompleted = {
  id: string;
  category: 'phones' | 'accessories' | 'tablets';
  namespaceId: string;
  name: string;
  capacityAvailable: ['64GB', '128GB', '256GB'];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'];
  color: string;
  images: string[];
  description: [
    {
      title: string;
      text: string[];
    },
    {
      title: string;
      text: string[];
    },
    {
      title: string;
      text: string[];
    },
  ];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};
