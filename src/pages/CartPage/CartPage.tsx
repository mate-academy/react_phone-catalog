import { useEffect, type FC } from 'react';
import styles from './CartPage.module.scss';
import { CartListSection } from '../../components/Sections/CartListSection';
import { CheckoutSection } from '../../components/Sections/CheckoutSection';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { useCartActionsStore } from '../../hooks/useCartAndFavorites';
import type { Product } from '../../types/product';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';

export const CartPage: FC = () => {
  const { products } = useFetchProducts();
  const { cartValues, loadFromStorage, removeFromCart } = useCartActionsStore();

  useEffect(() => {
    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type CartProduct = Product & {
    quantity: number;
    price: number;
  };

  const productsInCart: CartProduct[] = Object.entries(cartValues)
    .map(([id, quantity]) => {
      const product = products.find((product) => product.id === id);
      return product ? { ...product, quantity } : null;
    })
    .filter((item): item is CartProduct => item !== null);

  return (
    <div className={styles.cart}>
      <div className={styles.backContainer}>
        <GoBackButton />
      </div>
      <h1 className={styles.pageTitle}>Cart</h1>
      <div className={styles.contentWrapper}>
        <CartListSection
          productsInCart={productsInCart}
          onRemove={removeFromCart}
        />

        <CheckoutSection productsInCart={productsInCart} />
      </div>
    </div>
  );
};
