import { Product, ProductMainInfo } from './Product';

export interface ProductCardProps {
  products: Product;
  showFullPrice?: boolean;
}

export interface ProductMainInfoProps {
  product: ProductMainInfo;
  showFullPrice?: boolean;
}

export interface StyledCardProps {
  width: string;
  margin: string;
}

export interface StyledButtonProps {
  width: string;
}
