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

export type FilterParams = 'sort' | 'perPage';

export type FilterValue = string | null;

export type FilterOption = {
  value: FilterValue;
  label: string;
};

export interface Filter {
  title: string;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  options: FilterOption[];
  placeholder?: string;
  hasDefaultValue?: boolean;
}
