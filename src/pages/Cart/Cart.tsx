import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

import './Cart.scss';

export const Cart = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state, dispatch } = useCart();

  const totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClear = window.confirm(t('checkoutMessage'));

    if (shouldClear) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  return (
    <section className="cart-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="cart-page__back-link"
      >
        &lt; {t('back') || 'Back'}
      </button>

      <h1 className="cart-page__title">{t('cart')}</h1>

      {state.items.length === 0 ? (
        <p>{t('cartEmpty')}</p>
      ) : (
        <div className="cart-page__content">
          <div className="cart-page__items">
            {state.items.map(item => (
              <article key={item.id} className="cart-page__item">
                <div className="cart-page__item-left">
                  <button
                    type="button"
                    className="cart-page__item-remove"
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        id: item.id,
                      })
                    }
                  >
                    ✕
                  </button>

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-page__item-image-link"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${item.image}`}
                      alt={item.name}
                      className="cart-page__item-image"
                    />
                  </Link>

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-page__item-title-link"
                  >
                    <h2 className="cart-page__item-title">{item.name}</h2>
                  </Link>
                </div>

                <div className="cart-page__item-right">
                  <div className="cart-page__item-counter">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        dispatch({
                          type: 'DECREASE',
                          id: item.id,
                        })
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: 'INCREASE',
                          id: item.id,
                        })
                      }
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-page__item-price">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-page__summary">
            <div className="cart-page__summary-total">${total}</div>
            <div className="cart-page__summary-count">
              {t('totalFor')} {totalQuantity}{' '}
              {totalQuantity === 1 ? t('item') : t('items')}
            </div>

            <button
              type="button"
              className="cart-page__summary-button"
              onClick={handleCheckout}
            >
              {t('checkout')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
