import './Cart.scss';
import { CartItem } from './CartItem';
import { useCartFavorite } from '../../context/CartFavoriteContext';
import emptyCart from './../../images/img/cart-is-empty.png';
import { ProductAllType } from '../../types/Product';
import { Empty } from '../Empty';
import { ButtonBack } from '../ButtonBack';
import { useEffect, useState } from 'react';

export const Cart = () => {
  const { cartItems } = useCartFavorite();
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // const totalCost = cartItems.reduce((acc, prod) => {
  //   return acc + prod.price * prod.count!;
  // }, 0);

  // const totalItems = cartItems.reduce((acc, prod) => {
  //   return acc + prod.count!;
  // }, 0);

  useEffect(() => {
    setTotalCost(
      cartItems.reduce((acc, prod) => {
        return acc + prod.price * prod.count!;
      }, 0),
    );

    setTotalItems(
      cartItems.reduce((acc, prod) => {
        return acc + prod.count!;
      }, 0),
    );
  }, [cartItems]);

  return (
    <section className="cart">
      <div className="container cart__container">
        <ButtonBack />
        <h2 className="cart__title">Cart</h2>

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
              <span className="cart__total-amount">${totalCost}</span>
              <span className="cart__total-text">
                Total for {totalItems} item
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
