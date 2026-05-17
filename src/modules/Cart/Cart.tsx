import { useProducts } from '../../hooks/context/useProducts';
import { Loader } from '../shared/components/Loader';
import styles from './Cart.module.scss';
import { CartHeader } from './components/CartHeader';
import { CartMain } from './components/CartMain';

export const Cart = () => {
  const { loading, error, reload } = useProducts();

  if (error) {
    return <Loader status="error" onReload={() => reload()} />;
  }
  return (
    <div className={styles.page}>
      <CartHeader />

      <CartMain />
    </div>
  );
};
