import { FC } from 'react';
import Product from '../../../Types/Product';
import ProductCard from '../ProductCard/ProductCard';
import s from './ProductsList.module.css';

interface Props {
  products: Product[];
}

const ProductsList: FC<Props> = ({ products }) => {
  return (
    <div className={s.productList}>
      {products.slice(0, 16).map(product => (
        <div key={product.id} className={s.item}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
