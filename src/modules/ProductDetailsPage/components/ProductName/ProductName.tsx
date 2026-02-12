import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './ProductName.module.scss';

export const ProductName = () => {
  const { activeProduct } = useProduct();

  return <div className={styles.title}>{activeProduct?.name}</div>;
};
