import { Product } from '../../store/models/product';

export interface ProductCardProps {
  item: Product,
  isInCart?: boolean,
  isInFav?: boolean,
}
