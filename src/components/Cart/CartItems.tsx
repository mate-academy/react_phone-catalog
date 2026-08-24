import styles from '../Cart/cart.module.scss';
import { BackNavigation } from '../BackNavigation/BackNavigation';
import { useProductActions } from '../../context/ProductActionsContext';
import { allProducts } from '../../styles/utils/getAllProducts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../../hooks/usePoducts';
import { Loader } from '../Loader';

export const CartItems = () => {
  const { cart, addToCart, removeOneFromCart, removeFromCart, clearCart } =
    useProductActions();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { loading } = useProducts();

  const totalItems = cart.length;

  const cartProducts = Array.from(
    new Map(
      allProducts
        .filter(product => cart.includes(String(product.id)))
        .map(product => [product.id, product]),
    ).values(),
  );

  const getQuantity = (id: string) => {
    return cart.filter(itemId => itemId === id).length;
  };

  const totalPrice = cartProducts.reduce((sum, product) => {
    const quantity = getQuantity(product.itemId);

    return sum + product.price * quantity;
  }, 0);

  const handleCheckout = () => {
    const confirmCheckout = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmCheckout) {
      clearCart();
    }
  };

  return (
    <div className={styles.cart}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.cart__content}>
          <div className={styles.cart__back}>
            <BackNavigation />
          </div>
          <div className={styles.header}>
            <h1 className={styles.header__title}>Cart</h1>
          </div>
          {cartProducts.length === 0 ? (
            <div className={styles.noProducts__message}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className={styles.cart__layout}>
              <div className={styles.cart__list}>
                {cartProducts.map(item => {
                  const quantity = getQuantity(item.itemId);

                  return (
                    <div key={item.id} className={styles.cart__items}>
                      <div className={styles.cart__item}>
                        <div>
                          <button
                            onMouseEnter={() => setIsHovered(item.itemId)}
                            onMouseLeave={() => setIsHovered(null)}
                            onClick={() => removeFromCart(item.itemId)}
                          >
                            <img
                              className={styles.icons__close}
                              src={
                                isHovered === item.itemId
                                  ? `${import.meta.env.BASE_URL}/img/icons/Close.svg`
                                  : `${import.meta.env.BASE_URL}/img/icons/disabled-close.svg`
                              }
                              alt="disabled close"
                            />
                            <img
                              className={styles.icons__closeDark}
                              src={
                                isHovered === item.itemId
                                  ? `${import.meta.env.BASE_URL}/img/icons-dark/Close.svg`
                                  : `${import.meta.env.BASE_URL}/img/icons-dark/Disabled-close.svg`
                              }
                              alt="disabled close"
                            />
                          </button>
                        </div>

                        <div className={styles.cart__details}>
                          <Link
                            to={`/${item.category}/${item.itemId}`}
                            className={styles.link}
                          >
                            <img
                              className={styles.image}
                              src={item.image}
                              alt={item.name}
                            />
                            <p className={styles.item__name}>{item.name}</p>
                          </Link>
                        </div>
                      </div>

                      <div className={styles.cart__controls}>
                        <div className={styles.quantity}>
                          <button
                            className={styles.quantity__icons}
                            onClick={() => removeOneFromCart(item.itemId)}
                            disabled={quantity === 1}
                          >
                            <img
                              className={styles.quantity__icon}
                              src={
                                quantity === 1
                                  ? `${import.meta.env.BASE_URL}/img/icons/disabled-minus.svg`
                                  : `${import.meta.env.BASE_URL}/img/icons/minus.svg`
                              }
                              alt="minus button"
                            />
                            <img
                              className={styles.quantity__iconDark}
                              src={
                                quantity === 1
                                  ? `${import.meta.env.BASE_URL}/img/icons-dark/Disabled-minus.svg`
                                  : `${import.meta.env.BASE_URL}/img/icons-dark/Minus.svg`
                              }
                              alt="minus button"
                            />
                          </button>
                          <p className={styles.quantity__numb}>{quantity}</p>
                          <button
                            className={styles.quantity__icons}
                            onClick={() => addToCart(item.itemId)}
                          >
                            <img
                              className={styles.quantity__icon}
                              src={`${import.meta.env.BASE_URL}/img/icons/Plus.svg`}
                              alt="button plus"
                            />
                            <img
                              className={styles.quantity__iconDark}
                              src={`${import.meta.env.BASE_URL}/img/icons-dark/Plus.svg`}
                              alt="button plus"
                            />
                          </button>
                        </div>

                        <div className={styles.cart__price}>
                          <p>${item.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.cart__checkout}>
                <div className={styles.checkout__info}>
                  <p className={styles.checkout__info__price}>${totalPrice}</p>
                  <p className={styles.checkout__info__items}>
                    Total for {totalItems} items
                  </p>
                </div>

                <button
                  className={styles.checkout__button}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
