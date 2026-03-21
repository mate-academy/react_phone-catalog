export type Tablet = {
  id: string;
  category: 'tablets';
  namespaceId: string;
  name: string;
  capacityAvailable: CapacityTablet[];
  capacity: CapacityTablet;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorTablet[];
  color: ColorTablet;
  images: string[];
  description: DescriptionItem;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: Cell[];
};

type CapacityTablet = '128GB' | '256GB' | '512GB' | '1TB' | '2TB';
type ColorTablet = 'spacegray' | 'silver';
type Cell =
  | 'GPRS'
  | 'EDGE'
  | 'WCDMA'
  | 'UMTS'
  | 'HSPA'
  | 'LTE'
  | 'Not applicable';
type DescriptionItem = {
  title: string;
  text: string[];
};
