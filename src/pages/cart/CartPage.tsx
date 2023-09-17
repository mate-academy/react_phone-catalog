import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { CartProduct } from '../../components/CartProduct/CartProduct';
import styles from './CartPage.module.scss';
import { removeFromCart, updateLocalStorage } from '../../helpers/Cart';
import { formatCurrency } from '../../helpers/utils';
import { CartItem } from '../../types/CartItem';
import { useCartContext } from '../../context/cartContext';

export const CartPage: FC = () => {
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
      <label htmlFor="cartnav">
        <div
          className={styles.cart__nav}
          id="cartnav"
        >
          <button
            type="button"
            className="cart__back"
            onClick={handleBackClick}
          >
            <ArrowLeft />
          </button>
          <div className={styles.cart__navtext}>
            Back
          </div>
        </div>
      </label>

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
                <CartProduct
                  item={item}
                  onRemove={handleRemoveItem}
                  increase={increaseQuantity}
                  decrease={decreaseQuantity}
                />
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className={styles.cart__total}>
              <div className={styles.cart__total__info}>
                <div className={styles.cart__total__title}>
                  {formatCurrency(totalPrice)}
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
