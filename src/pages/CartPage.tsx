import {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalContext';
import { Loader } from '../components/Loader';
import { getCartItems } from '../helpers/getProductsByCategories';
import { ICONS } from '../icons';
import { BASE_URL } from '../utils/const';

export const CartPage = () => {
  const navigate = useNavigate();
  const { localStore, handleChooseCart } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const cartItems = getCartItems(localStore);

  const loaded = useCallback(
    debounce(setIsLoading, 1000),
    [],
  );

  useEffect(() => {
    loaded(!isLoading);
  }, []);

  const totalPrice
    = cartItems.reduce((acc, el) => acc + (el.price * el.quantity), 0);

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__wrap">
          <div className="cart-page__navigation">
            <button
              type="button"
              data-cy="backButton"
              className="button button--direction button--details-page"
              onClick={() => navigate(-1)}
            >
              <img src={ICONS.arrow} alt="icon" className="icon icon--left" />
              <p className="page-navigation__text">Back</p>
            </button>

            <h1 className="title title--h1">CartPage</h1>
          </div>

          {isLoading && <Loader />}

          {!isLoading && !cartItems.length && (
            <h2 className="title title--h2 title--empty-page">
              <strong>Your cart is empty</strong>
            </h2>
          )}

          {!isLoading && !!cartItems.length && (
            <div className="cart-page__items-container">
              <div className="cart-page__items-wrap">
                {cartItems.map(cart => (
                  <div className="cart-page__item" key={cart.id}>
                    <button
                      type="button"
                      className="button button--clear cart-page__button"
                      data-cy="cartDeleteButton"
                      onClick={() => {
                        handleChooseCart(cart, 'delete');
                        setIsShowMessage(false);
                      }}
                    >
                      <img src={ICONS.close_icon} alt="remove product" />
                    </button>

                    <div className="cart-page__item-img-box">
                      <img
                        src={`${BASE_URL}${cart.image}`}
                        alt={cart.name}
                        className="cart-page__item-img"
                      />
                    </div>

                    <div className="cart-page__text">
                      {cart.name}
                    </div>

                    <div className="cart-page__btns">
                      <button
                        type="button"
                        className={cn('button button--count', {
                          'button--disabled': cart.quantity <= 1,
                          'button--hover': cart.quantity > 1,
                        })}
                        onClick={() => {
                          handleChooseCart(cart, 'deleteQuantity');
                          setIsShowMessage(false);
                        }}
                        disabled={cart.quantity <= 1}
                      >
                        <img
                          src={ICONS.icon_minus_not_active}
                          alt="delete from basket"
                          className="icon"
                        />
                      </button>

                      <div className="cart-page__count">
                        {cart.quantity}
                      </div>

                      <button
                        type="button"
                        className="button button--count button--hover"
                        onClick={() => {
                          handleChooseCart(cart, 'addQuantity');
                          setIsShowMessage(false);
                        }}
                      >
                        <img
                          src={ICONS.icon_plus}
                          alt="plus to buy"
                          className="icon"
                        />
                      </button>
                    </div>

                    <div className="cart-page__item-price title--h2">
                      {`$${cart.price * cart.quantity}`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-page__amount">
                <div className="cart-page__total-amount-info">
                  <div
                    className="cart-page__amount-info"
                    data-cy="productQauntity"
                  >
                    <p className="cart-page__total-price">
                      {`$${totalPrice}`}
                    </p>

                    <p className="cart-page__items-length">
                      {`Total from ${cartItems.length} items`}
                    </p>
                  </div>

                  <div className="cart-page__break-line" />

                  <button
                    type="button"
                    className={cn('button button--big button--checkout', {
                      'button--selected': isShowMessage,
                    })}
                    onClick={() => setIsShowMessage(!isShowMessage)}
                  >
                    <p className="button__text">
                      Checkout
                    </p>
                  </button>
                </div>

                {isShowMessage && (
                  <div className="cart-page__message">
                    We are sorry, but this feature is not implemented yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
