import { FC } from 'react';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

interface Props {
  products: Product[];
}

export const BrandNewModels: FC<Props> = ({ products }) => {
  return <ProductsSlider products={products} />;
};
