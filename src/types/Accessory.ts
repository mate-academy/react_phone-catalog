export type Accessory = {
  id: string;
  category: 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable: CapacityAccessories[];
  capacity: CapacityAccessories;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorAccessories[];
  color: ColorAccessories;
  images: string[];
  description: DescriptionItem;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: CellAccessories[];
};

type CapacityAccessories = '128GB' | '256GB' | '512GB' | '1TB' | '2TB';
type ColorAccessories = 'spacegray' | 'silver';
type CellAccessories = 'Not applicable';
type DescriptionItem = {
  title: string;
  text: string[];
};
