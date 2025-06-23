import { useAppSelector } from '../../app/hooks';
import { Container } from '../../components/container/Container';
import { PageNav } from '../../components/pageNav/PageNav';
import { TitlePages } from '../../components/title/TitlePages';
import styles from './Cart.module.scss';
import { CartItems } from './components/cartItems/cartItems';

export const Cart = () => {
  const products = useAppSelector(state=>state.cartItem.cartItems)
  return (<>
    <Container>
      <TitlePages type={'cart'} />
      {products.length > 0 ? <CartItems products={products} /> :
        <img src={'./img/cart-is-empty.png' } />}
    </Container></>)
}
