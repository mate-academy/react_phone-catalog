import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { CartContext } from './CartContext';
import CN from 'classnames';
import { getCart } from '../../store/index';
import { removeFromCart, setCartQuantity } from '../../store/cart';
// import { setPriceWithDiscount } from '../../helpers/setPriceWithDiscount';

// import { CartItem } from './CartItem';
import './Cart.scss';
import { BreadCrumbs } from '../BreadCrumbs';

export const CartPageRedux = () => {
  const itemsCart = useSelector(getCart);
  const dispatch = useDispatch();

  const getTotalQuantity = () => {
    return itemsCart.reduce((sum: number, { quantity }) => sum + quantity, 0);
  };

  // const getTotalQuantity = itemsCart.length;

  // const getTotalPriceWithDiscount = () => {
  //   return itemsCart.reduce((prev: number, item: { price: number; discount: number }) => (
  //     prev + (item.price - item.price * (item.discount / 100))), 0);
  // };

  const setPriceWithDiscount = (product: ProductItem) => (
    product.price - product.price * (product.discount / 100)
  );

  // const getTotalPriceWithDiscount = () => {
  //   return itemsCart.reduce((sum, { quantity }) => sum + quantity, 0);
  // };

  const getTotalPriceWithDiscount = () => {
    return itemsCart.reduce((sum, { quantity, product }) => (
      sum + quantity * setPriceWithDiscount(product)
    ), 0);
  };

  // useEffect(() => {
  //   setTotalQuantity(productInCart.length);
  //   setTotalCost(productInCart.reduce((prev: number, item: { price: number; discount: number }) => {
  //     return prev + (item.price - item.price * (item.discount / 100));
  //   }, 0));
  // }, []);

  return (
    <>
      <div className="productInCart container">
        <BreadCrumbs />
        <div>
          <h1 className="products__title">Cart</h1>
        </div>
        <div className="cart">

          {itemsCart.length === 0
            ? <h3 className="cart__empty">Your Cart is Ampty</h3>
            : (
              <ul className="cart__list">
                {itemsCart.map(item => (
                  <li
                    className="list__cartItem"
                    key={item.product.id}
                  >
                    <button
                      type="button"
                      className="cart__button cart__button--delete"
                      onClick={() => dispatch(removeFromCart(item.product))}
                    />
                    <img
                      className="cart__productImg"
                      src={item.product.imageUrl}
                      alt="Product"
                    />
                    <div className="cart__productName">{item.product.name}</div>
                    <div className="cart__itemQuantity">
                      <button
                        type="button"
                        className={CN('lift__button lift__button--decrease',
                          { disabledBtn: `${item.quantity}` === '1' })}
                        onClick={() => dispatch(setCartQuantity(item.product, item.quantity - 1))}
                        disabled={`${item.quantity}` === '1'}
                      >
                        -
                      </button>
                      <p className="counter__value">{item.quantity}</p>
                      <button
                        type="button"
                        className="lift__button lift__button--increse"
                        onClick={() => dispatch(setCartQuantity(item.product, item.quantity + 1))}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <h2 className="counter__cost">
                        $
                        {setPriceWithDiscount(item.product) * item.quantity}
                      </h2>
                    </div>
                  </li>
                ))}
              </ul>
            )}

          <div className="cart__checkout checkout">
            <h1 className="checkout__header">
              $
              {getTotalPriceWithDiscount()}
            </h1>
            <p className="checkout__text">
              Total for
              {' '}
              {getTotalQuantity()}
              {' '}
              items
            </p>
            <span className="checkout__decor" />
            <button
              type="button"
              className="checkout__button button__cart"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

    </>
  );
};
