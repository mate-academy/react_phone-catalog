import { UILoadStatus } from '@features/useUILoader';
import { Capacity, Colors } from '@shared/types';

type ColorButtonConfig = {
  to: string;
  className: string;
  style: React.CSSProperties;
  'aria-label': string;
  'aria-current'?: 'page' | undefined;
  onClick: (e: React.MouseEvent) => void;
};

type CapacityButtonConfig = {
  to: string;
  className: string;
  'aria-label': string;
  'aria-current'?: 'page' | undefined;
  onClick: (e: React.MouseEvent) => void;
};

interface ColorOptionProps {
  options: Colors[];
  active: Colors;
}

interface CapacityOptionProps {
  options: Capacity[];
  active: Capacity;
}

type OptionsProps = {
  arrays: [ColorOptionProps, CapacityOptionProps];
  link: string[];
};

type PurchaseBlockProps = {
  priceRegular: number;
  priceDiscount?: number;
  id: string;
};

type Breadcrumbs = {
  name: string;
  to: string;
}[];

type ProdSliderData = {
  images: string[];
  name: string;
};

interface UiProps {
  slider: ProdSliderData | UILoadStatus;
  SKU: string;
  optionsData: UILoadStatus | OptionsProps;
  purchaseData: UILoadStatus | PurchaseBlockProps;
  baseDetailedList: Record<string, string | null>;
}

interface InfoProps {
  description: { title: string; text: string[] }[] | null;
  extendedDetailedList: Record<string, string | null>;
}

interface Conf {
  breadcrumbs: Breadcrumbs | undefined;
  h1: string;
  uiProps: UiProps;
  infoProps: InfoProps;
}

export {
  type ColorButtonConfig,
  type CapacityButtonConfig,
  type ColorOptionProps,
  type CapacityOptionProps,
  type OptionsProps,
  type PurchaseBlockProps,
  type UiProps,
  type InfoProps,
  type Conf,
};
