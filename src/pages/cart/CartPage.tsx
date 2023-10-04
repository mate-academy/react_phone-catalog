import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import styles from './CartPage.module.scss';
import { removeFromCart, updateLocalStorage } from '../../helpers/Cart';
import { CartItem } from '../../types/CartItem';
import { useCartContext } from '../../context/cartContext';
import { Close } from '../../assets/icons/Close';

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutIsClicked, setCheckoutIsClicked] = useState(false);
  const { setAddedToCart } = useCartContext();

  const totalItemsCount = cartItems.reduce((accum, item) => (
    item.quantity + accum
  ), 0);

  useEffect(() => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

    setCartItems(cart);
  }, []);

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item);
    setCartItems(currentItems => (
      currentItems.filter(({ product }) => product.id !== item.product.id)
    ));
    setAddedToCart(prev => prev - 1);
  };

  const increaseQuantity = (item: CartItem) => {
    setCartItems(prevCartItems => {
      const updatedItems = prevCartItems.map(cartItem => (
        cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));

      updateLocalStorage(updatedItems);

      return updatedItems;
    });
  };

  const decreaseQuantity = (item: CartItem) => {
    setCartItems(prevCartItems => {
      const updatedItems = prevCartItems.map(cartItem => (
        cartItem.product.id === item.product.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));

      updateLocalStorage(updatedItems);

      return updatedItems;
    });

    updateLocalStorage(cartItems);
  };

  const totalPrice = cartItems.reduce((accum, current) => (
    (current.product.price * current.quantity) + accum
  ), 0);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className={styles.cart}>
      <button
        className={styles.cart__nav}
        id="cartnav"
        type="button"
        onClick={handleBackClick}
      >
        <button
          type="button"
          className="cart__back"
        >
          <ArrowLeft />
        </button>
        <div className={styles.cart__navtext}>
          Back
        </div>
      </button>

      <div className={styles.cart__title}>
        {cartItems.length ? 'Cart' : 'Your cart is empty'}
      </div>

      {checkoutIsClicked ? (
        <div className={styles.noproducts}>
          <div className={styles.noproducts__text}>
            We are sorry, but this feature is not implemented yet
          </div>
          <Link
            to="/"
            className={styles.noproducts__link}
          >
            <button type="button" className={styles.noproducts__button}>
              Go Home
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.cart__main}>
          <div className={styles.cart__items}>
            {cartItems.map(item => (
              <div key={item.product.id}>
                <div className={styles.item}>
                  <button
                    type="button"
                    data-cy="cartDeleteButton"
                    className={styles.item__icon}
                    onClick={() => handleRemoveItem(item)}
                  >
                    <Close />
                  </button>
                  <img
                    className={styles.item__image}
                    src={`new/${item.product.image}`}
                    alt="product"
                  />
                  <div className={styles.item__text}>
                    {item.product.name}
                  </div>
                  <div
                    className={styles.item__cuantity}
                    data-cy="productQauntity"
                  >
                    <button
                      type="button"
                      className={styles.item__cuantity__icon}
                      onClick={() => decreaseQuantity(item)}
                    >
                      -
                    </button>
                    <div className={styles.item__cuantity__count}>
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      className={styles.item__cuantity__icon}
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>

                  <div
                    className={styles.item__price}
                  >
                    {`$${item.product.price}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className={styles.cart__total}>
              <div className={styles.cart__total__info}>
                <div className={styles.cart__total__title}>
                  {`$${totalPrice}`}
                </div>
                <div className={styles.cart__total__subtitle}>
                  {`Total for ${totalItemsCount} items`}
                </div>
              </div>

              <div className="cart__total__checkout">
                <button
                  type="button"
                  className={styles.cart__total__button}
                  onClick={() => setCheckoutIsClicked(!checkoutIsClicked)}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
