export type Phone = {
  id: string;
  category: 'phones';
  namespaceId: string;
  name: string;
  capacityAvailable: CapacityPhone[];
  capacity: CapacityPhone;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorPhone[];
  color: ColorPhone;
  images: string[];
  description: DescriptionItem;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: CellPhone[];
};

type CapacityPhone = '64GB' | '128GB' | '256GB';
type ColorPhone = 'black' | 'green' | 'yellow' | 'white' | 'purple' | 'red';
type CellPhone = 'GPRS' | 'EDGE' | 'WCDMA' | 'UMTS' | 'HSPA' | 'LTE';
type DescriptionItem = {
  title: string;
  text: string[];
};
