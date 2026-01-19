import { DescriptionBlock } from './DescriptionBlock';

export type GoodBase = {
  id: string;
  namespaceId: string;
  name: string;

  capacityAvailable: string[];
  capacity: string;

  priceRegular: number;
  priceDiscount: number;

  colorsAvailable: string[];
  color: string;

  images: string[];
  description: DescriptionBlock[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
};
