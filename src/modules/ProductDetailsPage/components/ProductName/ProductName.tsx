import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './ProductName.module.scss';

export const ProductName = () => {
  const { product } = useProduct();

  return <div className={styles.title}>{product.name}</div>;
};
