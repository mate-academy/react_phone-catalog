import PageHeader from '@/shared/components/PageHeader/PageHeader';
import { BackButton } from '@/shared/components/BackButton/BackButton';
import CartList from '@/features/cart/CartList';
import CartCheckoutBox from '@/features/cart/CartCheckoutBox';
import styles from './Cart.module.scss';
import { useCartProducts } from '@/features/cart/hooks/useCartProducts';

export const CartPage = () => {
  const { isEmpty } = useCartProducts();

  return (
    <section className={styles.cartPage__container}>
      <PageHeader
        title="Cart"
        showBreadCrumbs={false}
        extraContent={<BackButton label="Back" />}
        variant="cartPage"
      />
      {isEmpty ? (
        <div className={styles.cartPage__empty}>Your cart is empty</div>
      ) : (
        <div className={styles.cartPage__layout}>
          <CartList />
          <CartCheckoutBox />
        </div>
      )}
    </section>
  );
};
