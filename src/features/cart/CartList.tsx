import CartItemComponent from './CartItemComponent';
import styles from '@/pages/Cart/Cart.module.scss';
import { useCartProducts } from './hooks/useCartProducts';
import { Loader } from '@/shared/components/Loader/Loader';

const CartList = () => {
  const { cartProducts, isLoading } = useCartProducts();

  if (isLoading)
    return (
      <div className={styles.cartPage__loaderWrapper}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.cartItemsList}>
      {cartProducts.map(item => (
        <CartItemComponent key={item.itemId} item={item} />
      ))}
    </div>
  );
};
export default CartList;
