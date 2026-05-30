import { useContext } from 'react';
import styles from './ProductList.module.scss';
import { AppContext } from '../../context/AppContext';
import { ProductCard } from '../ProductCard';

export const ProductList = () => {
  const { favourites } = useContext(AppContext)!;

  return (
    <div className={styles.productList}>
      {favourites.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
