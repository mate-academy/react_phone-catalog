import styles from './CartPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { cartSlice } from '../../store/slices/cart';
import { Back } from '../shared/components/back';
import { CartProduct, Product } from '../../types/types';
import { CartCheckout, CartItem } from './components/components';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(state => state.cart);
  const itemsCount = cartProducts.reduce(
    (sum, product) => sum + product.amount,
    0,
  );

  const totalPrice = cartProducts.reduce((acc, item: CartProduct) => {
    return acc + item.price * item.amount;
  }, 0);

  const handleIncreaseProduct = (product: Product) => {
    dispatch(cartSlice.actions.add(product));
  };

  const handleDecreaseProduct = (product: Product) => {
    dispatch(cartSlice.actions.decreaseAmount(product));
  };

  const handleRemove = (product: Product) => {
    dispatch(cartSlice.actions.remove(product));
  };

  const handleCheckout = () => {
    const result = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (result) {
      dispatch(cartSlice.actions.clearCart());
    }
  };

  return (
    <main className={styles.wrapper}>
      <Back />
      <h1>Cart</h1>
      <div className={styles.cart}>
        <div className={styles.cart__list}>
          {itemsCount > 0 ? (
            cartProducts.map((product: CartProduct) => (
              <CartItem
                key={product.id}
                item={product}
                onRemove={handleRemove}
                onIncrease={handleIncreaseProduct}
                onDecrease={handleDecreaseProduct}
              />
            ))
          ) : (
            <div className={styles['empty-cart']}>
              <h2 className={styles['empty-cart__message']}>
                Your cart is empty
              </h2>
              <img
                src="./img/cart-is-empty.png"
                alt="Cart is empty"
                className={styles['empty-cart__image']}
              />
            </div>
          )}
        </div>
        <CartCheckout
          totalPrice={totalPrice}
          itemsCount={itemsCount}
          onCheckout={handleCheckout}
          isHidden={itemsCount === 0}
        />
      </div>
    </main>
  );
};
