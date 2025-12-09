import './Cart.scss';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { CartProduct } from '../../types/CartProduct';
import { useCartFavorite } from '../../context/CartFavoriteContext';
import emptyCart from '../../../public/img/unnown.jpg';

export const Cart = () => {
  const { cartItems } = useCartFavorite();

  return (
    <section className="cart">
      <div className="container cart__container">
        <div className="cart__back">
          <Link to="/" className="cart__back-link">
            <span>&#60;</span>
            <span>Back</span>
          </Link>
        </div>
        <h1 className="cart__title">Cart</h1>

        {cartItems && cartItems.length === 0 ? (
          <div className="cart__empty">
            <img src={emptyCart} alt="emptyCard" className="cart__empty-img" />
          </div>
        ) : (
          <div className="cart__wrapper">
            <div className="cart__items">
              {cartItems.map((item: CartProduct, i: number) => (
                <CartItem product={item} key={item.name + i} />
              ))}
            </div>
            <div className="cart__total">
              <span className="cart__total-amount">$2997</span>
              <span className="cart__total-text">Total for {12} items</span>
              <button className="cart__total-checkout" type="button">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
