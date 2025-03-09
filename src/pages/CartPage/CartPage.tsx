import styles from './CartPage.module.scss';
import classNames from 'classnames';
import { useCallback, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartFavouritesContext } from '../../contexts/CartFavouritesContext';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton';
import { useLoading } from '../../utils/hooks/useLoading';
import { useBackNavigation } from '../../utils/hooks/useBackNavigation';
// eslint-disable-next-line max-len
import { useCartAndFavouritesCount } from '../../utils/hooks/useCartAndFavouritesCount';
import { TIMEOUT_LOADING_DURATION } from '../../utils/constants';

export const CartPage = () => {
  const { state, dispatch } = useContext(CartFavouritesContext);
  const { cart } = state;
  const { cartCount } = useCartAndFavouritesCount();
  const { pathname } = useLocation();
  const isLoading = useLoading(TIMEOUT_LOADING_DURATION);
  const handleBackNavigation = useBackNavigation();

  const handleRemove = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleIncrease = (itemId: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: itemId });
  };

  const handleDecrease = (itemId: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: itemId });
  };

  const calculateItemTotalPrice = useCallback(
    (price: number, quantity: number) => price * quantity,
    [],
  );

  const calculateTotalPrice = useCallback(() => {
    return cart.reduce((total, { item, quantity }) => {
      return total + calculateItemTotalPrice(item.price, quantity);
    }, 0);
  }, [cart, calculateItemTotalPrice]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles['cart-page']}>
      <section className={styles['cart-page__back-button']}>
        <BackButton onClick={handleBackNavigation} />
      </section>

      <h1 className={styles['cart-page__title']}>Cart</h1>

      {cartCount === 0 ? (
        <p className={styles['cart-page__empty']}>Your cart is empty</p>
      ) : (
        <div className={styles['cart-page__content']}>
          <section className={styles['cart-page__items']}>
            {cart.map(({ item, quantity }) => (
              <article key={item.itemId} className={styles['cart-page__item']}>
                <div className={styles['cart-page__item-info']}>
                  <button
                    className={styles['cart-page__remove-button']}
                    onClick={() => handleRemove(item.itemId)}
                  >
                    <img
                      src="/icons/close-cart.png"
                      alt="Close icon"
                      className={styles['cart-page__remove-icon']}
                    />
                  </button>

                  <img
                    src={item.image}
                    alt="Product image"
                    className={styles['cart-page__item-image']}
                  />

                  <Link
                    to={`/${item.category}/${item.itemId}`}
                    state={{ from: pathname }}
                    className={styles['cart-page__item-link']}
                  >
                    {item.name}
                  </Link>
                </div>

                <div className={styles['cart-page__item-details']}>
                  <div className={styles['cart-page__controls']}>
                    <button
                      className={classNames(
                        styles['cart-page__controls-button'],
                        {
                          [styles['cart-page__controls-button--disabled']]:
                            quantity === 1,
                        },
                      )}
                      onClick={() => handleDecrease(item.itemId)}
                      disabled={quantity === 1}
                    >
                      -
                    </button>

                    <span className={styles['cart-page__controls-count']}>
                      {quantity}
                    </span>

                    <button
                      className={styles['cart-page__controls-button']}
                      onClick={() => handleIncrease(item.itemId)}
                    >
                      +
                    </button>
                  </div>

                  <span className={styles['cart-page__item-price']}>
                    ${calculateItemTotalPrice(item.price, quantity)}
                  </span>
                </div>
              </article>
            ))}
          </section>

          <section className={styles['cart-page__total']}>
            <div className={styles['cart-page__total-info']}>
              <span className={styles['cart-page__total-price']}>
                ${calculateTotalPrice()}
              </span>

              <span className={styles['cart-page__total-count']}>
                Total for {cartCount} items
              </span>
            </div>

            <button className={styles['cart-page__total-order']}>
              Checkout
            </button>
          </section>
        </div>
      )}
    </div>
  );
};
