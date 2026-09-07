import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Container } from '../../components/container/Container';
import { TitlePages } from '../../components/title/TitlePages';
import styles from './Cart.module.scss';
import { CartItems } from './components/cartItems/cartItems';
import { Checkout } from './components/checkout/Checkout';
import { CartModal } from './components/cartModal/CartModal';

export const Cart = () => {
  const [modal, setModal] = useState(false);
  const products = useAppSelector(state => state.cartItem.cartItems);

  return (
    <>
      <Container>
        <TitlePages type={'cart'} />
        <div className={styles.cart}>
          {modal && <CartModal setModal={setModal} />}

          <div className={styles.cart__wrapper}>
            {products.length > 0 && <CartItems products={products} />}
          </div>

          {products.length > 0 && (
            <div className={styles.cart__checkout}>
              <Checkout products={products} setModal={setModal} />
            </div>
          )}

          {products.length === 0 && <div className={styles.cart__empty}></div>}
        </div>
      </Container>
    </>
  );
};
