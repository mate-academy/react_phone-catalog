import style from './CartPage.module.scss';
import { NavLink } from 'react-router-dom';
import { ProductInCart } from '../../components/ProductInCart';

export const CartPage = () => {
  return (
    <div className={style.cartPage}>
      <NavLink to={'..'} relative="path" className={style.backButton}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </NavLink>

      <h1 className={style.title}>Cart</h1>

      <div className={style.main}>
        <ProductInCart />
        <ProductInCart />
        <ProductInCart />
      </div>

      <div className={style.checkout}>
        <div className={style.checkout__items}>
          <h2 className={style.checkout__items__price}>$2657</h2>
          <p className={style.checkout__items__total}>Total for 3 items</p>
        </div>
        <div className={style.checkout__divider} />
        <button className={style.checkout__button}>Checkout</button>
      </div>
    </div>
  );
};
