export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface CartProduct {
  id: string;
  quantity: number;
  product: Product;
}

type DescriptionProduct = {
  title: string;
  text: string[];
};

export interface ProductDetailsType {
  camera: string;
  capacity: string;
  capacityAvailable: string[];
  category: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: DescriptionProduct[];
  id: string;
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
}

export type FilterParams = 'sort' | 'perPage';

export type FilterValue = string | null;

export type FilterOption = {
  value: FilterValue;
  label: string;
};

export interface Filter {
  title?: string;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  options: FilterOption[];
  placeholder?: string;
  hasDefaultValue?: boolean;
}
