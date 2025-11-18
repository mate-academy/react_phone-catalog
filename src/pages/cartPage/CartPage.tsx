import { useCartPage } from './model';
import { CartItemWidget, CheckoutWidget } from './ui';
import styles from './styles/cartPage.module.scss';
import { ReturnButton } from '@ui/returnButton';
import { ModalCheckout } from '@widgets/modalCheckout';

export const CartPage = () => {
  const { cart, itemsInCart, getWidgetProps } = useCartPage();

  const products = typeof cart === 'string' ? itemsInCart : cart.products;

  return (
    <main className={styles['layout-container']}>
      <ReturnButton />
      <section
        aria-labelledby="fav-heading"
        className={styles['widgets-container']}
      >
        <h1 id="fav-heading">Cart</h1>
        {itemsInCart.length === 0 ? (
          <span className={styles.message}>Your cart is empty</span>
        ) : (
          <>
            <ul className={styles['cart-list']}>
              {products.map(el => {
                const { ...data } = getWidgetProps(el);

                return <CartItemWidget key={data.id} {...data} />;
              })}
            </ul>

            <CheckoutWidget
              totalPrice={typeof cart === 'string' ? cart : cart.total}
            />
          </>
        )}
      </section>
      <ModalCheckout />
    </main>
  );
};
