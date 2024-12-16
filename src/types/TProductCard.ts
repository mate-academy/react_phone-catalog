import { Product } from './Product';

export interface ProductCardProps {
  product: Product;
  showFullPrice?: boolean;
}

export interface StyledCardProps {
  width: string;
  margin: string;
}

export interface StyledButtonProps {
  width: string;
}
