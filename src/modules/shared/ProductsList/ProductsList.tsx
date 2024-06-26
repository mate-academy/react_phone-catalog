import { FC } from 'react';
import Product from '../../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import Skeleton from '../Skeleton/Skeleton';
import styles from './ProductsList.module.css';

interface Props {
  products: Product[];
  isChangingPage: boolean;
}

const ProductsList: FC<Props> = ({ products, isChangingPage }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div key={product.id} className={styles.item}>
          {isChangingPage ? <Skeleton /> : <ProductCard product={product} />}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
