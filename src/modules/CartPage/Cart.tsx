import { useAppSelector } from '../../app/hooks';
import { Container } from '../../components/container/Container';

import { TitlePages } from '../../components/title/TitlePages';
import styles from './Cart.module.scss';
import { CartItems } from './components/cartItems/cartItems';
import { Checkout } from './components/checkout/Checkout';

export const Cart = () => {
  const products = useAppSelector(state=>state.cartItem.cartItems)
  return (<>
    <Container>
      <TitlePages type={'cart'} />
      <div className={styles.cart}>
        <div className={styles.cart__wrapper}>
          {products.length > 0 &&
          <CartItems products={products} />}</div>

        {products.length > 0 &&
          <div className={styles.cart__checkout}>
          <Checkout products={products} />
          </div>}
        { products.length===0 && <div  className={styles.cart__empty }></div>}
      </div>
    </Container></>)
}
