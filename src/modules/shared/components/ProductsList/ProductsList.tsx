import { useContext } from 'react';
import styles from './ProductsList.module.scss';
import { ProductsContext } from '../../_store/DataProvider';
import { ProductCard } from '../ProductCard';

type Props = {};

export const ProductList: React.FC<Props> = () => {
  const { products } = useContext(ProductsContext);

  return (
    <ul className={styles['product-list']}>
      {products.slice(8, 11).map(item => (
        <li key={item.id}>
          <ProductCard product={item} type="ds" />
        </li>
      ))}
    </ul>
  );
};
