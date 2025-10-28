import { useCartPage } from './model';
import { CartItemWidget, CheckoutWidget, ModalCheckout } from './ui';
import styles from './styles/cartPage.module.scss';
import { ReturnButton } from '@ui/returnButton';

export const CartPage = () => {
  const { itemsInCart, updatePrice, totalPrice } = useCartPage();

  return (
    <main className={styles['layout-container']}>
      <ReturnButton />
      <section
        aria-labelledby="fav-heading"
        className={styles['widgets-container']}
      >
        <h1 id="fav-heading">Cart</h1>
        {itemsInCart.length < 1 ? (
          <span className={styles.message}>Your cart is empty</span>
        ) : (
          <>
            <ul className={styles['cart-list']}>
              {itemsInCart.map(el => (
                <CartItemWidget
                  key={el.id}
                  cartItem={el}
                  updatePrice={updatePrice}
                />
              ))}
            </ul>

            <CheckoutWidget totalPrice={totalPrice} />
          </>
        )}
      </section>
      <ModalCheckout totalPrice={+totalPrice} itemsInCart={itemsInCart} />
    </main>
  );
};
