import type { ProductCards } from './product.types';

export interface ProductCarouselProps {
  title?: string;
  products?: ProductCards;
  hotPrice?: boolean;
}
