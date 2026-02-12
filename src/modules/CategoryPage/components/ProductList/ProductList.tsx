import { FC } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';
import s from './ProductList.module.scss';

interface Props {
  products: Product[];
}
export const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className={s.productList}>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
