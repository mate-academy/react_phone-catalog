import scss from './Cart.module.scss';
import { ButtonBack } from '../shared/components/ButtonBack';

export const Cart = () => {
  return (
    <section className={scss.cart}>
      <ButtonBack />
      <h1 className={scss.cart__title}>Cart</h1>
    </section>
  );
};
