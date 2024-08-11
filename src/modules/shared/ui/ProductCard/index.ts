import { ProductCard as ProductCardWrapper } from './ProductCard';
import { ProductCardActions as Actions } from './ProductCardActions';
import { ProductCardImage as Image } from './ProductCardImage';
import { ProductCardPrice as Price } from './ProductCardPrice';
import { ProductCardSpecs as Specs } from './ProductCardSpecs';
import { ProductCardTitle as Name } from './ProductCardTitle';

export const ProductCard = Object.assign(ProductCardWrapper, {
  Actions,
  Image,
  Name,
  Price,
  Specs,
});
