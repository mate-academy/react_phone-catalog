import { BackLink } from '../BackLink/BackLink';
import style from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <section className={style['cart-page']}>
      <BackLink fromCategory="/" />
      <h1 className={style['cart-page__title']}>Cart</h1>
    </section>
  );
};
