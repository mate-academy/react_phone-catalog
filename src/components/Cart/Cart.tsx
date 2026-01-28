import './Cart.scss';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { useCartFavorite } from '../../context/CartFavoriteContext';
import emptyCart from './../../images/img/cart-is-empty.png';
import { ProductAllType } from '../../types/Product';
import { Empty } from '../Empty';

export const Cart = () => {
  const { cartItems } = useCartFavorite();

  const totalCost = cartItems.reduce((acc, prod) => {
    return acc + prod.price * prod.count!;
  }, 0);

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
          <Empty srcImage={emptyCart} />
        ) : (
          <div className="cart__wrapper">
            <div className="cart__items">
              {cartItems.map((item: ProductAllType, i: number) => (
                <CartItem product={item} key={item.name + i} />
              ))}
            </div>
            <div className="cart__total">
              <span className="cart__total-amount">{totalCost}</span>
              <span className="cart__total-text">
                Total for {cartItems.length} item
                {cartItems.length > 1 ? 's' : ''}
              </span>
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
