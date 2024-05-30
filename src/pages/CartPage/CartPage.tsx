import { BackLink } from '../../modules/BackLink';
import { Container } from '../../modules/Container';
import styles from './CartPage.module.scss';
import { Checkout } from './Checkout/Checkout';
import { useAppSelector } from '../../hooks/hooks';
import emptyCart from './../../images/placeholders/cart-is-empty.png';

export const CartPage = () => {
  const products = useAppSelector(state => state.cart.items);

  return (
    <section className="cart">
      <Container>
        <BackLink />
        <h2 className={styles.heading}>Cart</h2>
        {products.length > 0 ? (
          <Checkout products={products} />
        ) : (
          <div className={styles.emptyCart}>
            <img
              className={styles.emptyCart__img}
              src={emptyCart}
              alt="Not found"
            />
          </div>
        )}
      </Container>
    </section>
  );
};
