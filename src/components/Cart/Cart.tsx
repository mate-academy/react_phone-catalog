import { currentCartItems, currentCartTotalQuantity, currentCartTotalPrice,
  removeFromCart, updateCartQuantity } from '../../redux/cartSlice';
import { useAppSelector } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useDispatch } from 'react-redux';
import { crossIcon, homeIcon, minusIcon, plusIcon } from '../../../public/img/icons/svg_icons';
import { useTranslation } from 'react-i18next';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(currentCartItems);
  const totalPrice = useAppSelector(currentCartTotalPrice);
  const totalQuantity = useAppSelector(currentCartTotalQuantity);
  const dispatch = useDispatch();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);
  const { t } = useTranslation();

  const updateQuantityHelper = (item, qty) => {
    if (qty < 1) {
      return;
    } else {
      dispatch(updateCartQuantity({ productId: item.id, quantity: qty }));
    }
  };

  return (
    <div className={`cart__container ${currentTheme}`}>
      <div className="cart__nav-back">
        <a
          href="#"
          className="cart__back-link-container"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <svg
            className='arrow-right cart__arrow-right'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>

          <div className="cart__link-legend">
            {t('cart.back')}
          </div>
        </a>
      </div>

      <div className="cart__h1">
        {t('cart.cart')}
      </div>

      <div className="cart__content-container">{/* this is to separate total later*/}
        <div className='cart__cards-collection'>
          {cartItems.map(item => (
            <div className={`cart-item cart__card-container ${currentTheme}`} key={`lol key ${item.id}`}>
              <div className="cart__itemcard-topbar">
                <button className={`cart-remove-button ${currentTheme}`}
                  onClick={() => dispatch(removeFromCart(item?.id))
                  }>{crossIcon}
                </button>

                <div className="cart__img-wrap">
                  <img
                    src={`../../../public/${item.image}`}
                    alt="here should be an image"
                  />
                </div>

                <div className="cart__name-wrap">
                  {item.name}
                </div>

              </div>

              <div className="cart__itemcard-bottombar">
                <div className="cart__buttons-group">
                  <button className={`cart-minus-button ${currentTheme}`}
                    onClick={() => (
                      updateQuantityHelper(
                        item, item.quantity - 1,
                      ))
                    }
                    disabled={item.quantity === 1}
                  >{minusIcon}</button>
                  <div className="cart__item-qty">
                    {`${item.quantity}`}
                  </div>

                  <button className={`cart-plus-button ${currentTheme}`}
                    onClick={() => (
                      updateQuantityHelper(
                        item, item.quantity + 1,
                      ))
                    }>{plusIcon}</button>
                </div>
                <div className="cart__price-wrap">
                  {` $${item.price * item.quantity} `}
                </div>
              </div>
            </div>
          ))}

        </div>
        <div className="cart__total-wrap">
          <div className="cart__total-numbers">
            <div className="cart__total-numbers-price">
              {`$${totalPrice}`}
            </div>
            <div className="cart__total-numbers-qty">
              {`${t('cart.total_for')} ${totalQuantity} ${t('favorites.items')}`}
            </div>
          </div>
          <div className="cart__total-divider">

          </div>
          <div className="cart__total-checkout">
            <button className="cart__total-check-button">
              {t('btn.checkout')}
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};
