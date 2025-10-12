import { CartItemWidget } from './ui/CartItemWidget';
import styles from './styles/cartPage.module.scss';
import { useCartPage } from './model';
import { CheckoutWidget } from './ui/checkoutWidget';
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
      </section>
    </main>
  );
};
