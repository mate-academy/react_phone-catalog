import { Capacity, Category, Colors } from '@shared/types';

interface TechSpecsBase {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
}

interface TechSpecsExtended extends TechSpecsBase {
  capacity: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

interface BaseOptionProps {
  heading: string;
  link: string[];
}

interface ColorOptionProps extends BaseOptionProps {
  options: Colors[];
  active: Colors;
}

interface CapacityOptionProps extends BaseOptionProps {
  options: Capacity[];
  active: Capacity;
}

interface PurchaseProps {
  priceRegular: number;
  priceDiscount: number;
  id: string;
  category: Category;
}

interface UISectionProps {
  colorsOptions: ColorOptionProps;
  capacityOptions: CapacityOptionProps;
  purchase: PurchaseProps;
  baseSpecs: TechSpecsBase;
  slider: {
    images: string[];
    name: string;
  };
}

export {
  type TechSpecsBase,
  type TechSpecsExtended,
  type CapacityOptionProps,
  type ColorOptionProps,
  type PurchaseProps,
  type UISectionProps,
};
