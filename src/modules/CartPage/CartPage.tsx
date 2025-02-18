import style from './CartPage.module.scss';
import BackButton from '../../components/BackButton';
import CartItem from '../../components/CartItem';
import EmptyCart from '../../components/EmptyCart';
import Title from '../../components/Title';
import TotalCount from '../../components/TotalCount';
import { useAppSelector } from '../../redux/hooks';

const CartPage = () => {
  const { cart } = useAppSelector(state => state.cart);

  const showProducts = cart.map(item => (
    <CartItem key={item.id} product={item} />
  ));

  return showProducts.length === 0 ? (
    <EmptyCart />
  ) : (
    <section className={style.cart}>
      <div className="container">
        <BackButton />
        <Title text="Cart" />

        <div className={style.wrapper}>
          <div className={style.items}>{showProducts}</div>

          <TotalCount />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
