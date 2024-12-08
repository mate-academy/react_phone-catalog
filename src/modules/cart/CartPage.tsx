import cn from 'classnames';

import { Box } from '@shared/base/Box';

import styles from './CartPage.module.scss';
import { CartHeader } from './components/CartHeader';
import { CartList } from './components/CartList';
import { CartTotal } from './components/CartTotal';
import { useCart } from './hooks/useCart';

export const CartPage = () => {
  const { cartProducts, isInitialLoading } = useCart();

  return (
    <Box className={cn('container', styles.container)} variant="section">
      <CartHeader />

      <Box className={styles.cartInfo}>
        <CartList
          className={styles.list}
          products={cartProducts}
          isLoading={isInitialLoading}
        />

        <CartTotal
          className={styles.total}
          products={cartProducts}
          isLoading={isInitialLoading}
        />
      </Box>
    </Box>
  );
};
