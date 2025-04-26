export interface Product {
    id: string;
    name: string;
    priceRegular: number;
    priceDiscount: number;
    images: string[];
    screen: string;
    capacity: string;
    ram: string;
    namespaceId: string;
  }

  export interface ProductsSliderProps {
    title: string;
    subtitle: string;
    sortFunction?: (a: Product, b: Product) => number;
    cardProps?: Partial<PhoneCardProps>
    className: string;
  }

  export type PhoneCardProps = {
    product: Product;
    showDiscount?: boolean;
  }

  export type Option = {
    label: string;
    value: string;
  };

export type OptionProps = {
    options: Option[];
    value?: string,
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