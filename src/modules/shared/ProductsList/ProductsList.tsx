import { FC } from 'react';
import Product from '../../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import s from './ProductsList.module.css';

interface Props {
  products: Product[];
}

const ProductsList: FC<Props> = ({ products }) => {
  return (
    <div className={s.productList}>
      {products.map(product => (
        <div key={product.id} className={s.item}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
