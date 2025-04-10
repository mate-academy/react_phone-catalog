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
    sortFunction?: (a: Product, b: Product) => number;
    cardProps?: Partial<PhoneCardProps>
  }

  export type PhoneCardProps = {
    product: Product;
    showDiscount?: boolean;
  }