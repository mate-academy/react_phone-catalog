import { Link } from 'react-router-dom';
import { BackPath } from '../../components/BackButton/BackButton';
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle';
import { CartCheckout } from '../../components/CartCheckout/CartCheckout';
import { CartGrid } from '../../components/CartGrid/CartGrid';
import './Cart.scss';

export const CartPage = () => {
  return (
    <section className="cart-page">
      <Link to="/home" className="cart-page__link">
        <BackPath />
      </Link>
      <CategoryTitle title={'Cart'} />
      <div className="cart-page__content">
        <div className="cart-page__items">
          <CartGrid />
        </div>
        <div className="cart-page__summary">
          <CartCheckout />
        </div>
      </div>
    </section>
  );
};
