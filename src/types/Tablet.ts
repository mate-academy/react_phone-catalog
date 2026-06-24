// eslint-disable-next-line max-len
import { ProductCapacityType } from '../components/ProductMain/ProductInfo/ProductCapacity/ProductCapacity';
import { ProductColor } from '../components/ProductMain/ProductMain';

export type Tablet = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: ProductCapacityType[];
  capacity: ProductCapacityType;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ProductColor[];
  color: ProductColor;
  images: string[];
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: Cell[];
};

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
