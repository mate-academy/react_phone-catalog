import { Products } from '../../../../types';

export interface CardProps {
  product: Products;
  onCatalogPage?: boolean;
  onFavoPage?: boolean;
}
