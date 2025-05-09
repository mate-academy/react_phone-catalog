export interface Product {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  resolution: string;
  processor: string;
  capacity: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  namespaceId: string;
  color: string;
  colorsAvailable: string[];
  capacityAvailable: string[];
  quantity: number;
}

export interface ProductsSliderProps {
  title: string;
  subtitle?: string;
  sortFunction?: (a: Product, b: Product) => number;
  cardProps?: Partial<PhoneCardProps>;
  className?: string;
  className_2?: string;
}

export type PhoneCardProps = {
  product: Product;
  showDiscount?: boolean;
};

export type Option = {
  label: string;
  value: string;
};

export type OptionProps = {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export interface PhonesHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  itemsOnPage: string;
  setItemsOnPage: (value: string) => void;
}

export interface PhonesGridWithPaginationProps {
  sortBy: string;
  sortFunction?: (a: Product, b: Product) => number;
  itemsOnPage: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface BreadcrumbsProps {
  currentName?: string;
}

export interface PhoneDetailsPageProps {
  product?: PhoneCardProps['product'];
}

export interface CartItemProps {
  product: Product;
}

export type CartProduct = Product & { quantity: number };

export interface IconWithCounterProps {
  iconSrc: string;
  count: number;
  alt: string;
  onClick?: () => void;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
