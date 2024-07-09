import { useContext } from 'react';
import { BackButton } from '../BackButton/BackButton';
import style from './CartItems.module.scss';
import classNames from 'classnames';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeProvider';
import { IconClose } from '../Icons/IconClose';
import { IconPlus } from '../Icons/IconPlus';
import { IconMinus } from '../Icons/IconMinus';
import { IconNotActiveMinus } from '../Icons/IconMinusNotActive';
import { LanguageContext } from '../../store/LanguageProvider';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { StateContext } from '../../store/StateProvider';

export const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemsQuantity,
  } = useContext(ShoppingCartContext);

  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const { modalWindow, setModalWindow } = useContext(StateContext);
  console.log(modalWindow);

  const getTotalPrice = cartItems.reduce(
    (acc, val) => acc + val.quantity * (val.price || 0),
    0,
  );

  const getTotalQuantity = cartItems.reduce(
    (acc, val) => acc + val.quantity,
    0,
  );

  return (
    <div className={classNames(style.cart, { [style.cart__darkTheme]: theme })}>
      <div className={style.cart__wrapper}>
        <BackButton className={style.cart__cartBack} />
        <h1 className={style.cart__title}>
          {getTotalQuantity > 0 ? t('cart') : t('yourCartIsEmpty')}
        </h1>
        <div className={style.cart__gridContainer}>
          <ul className={style.cart__list}>
            {cartItems.map(item => (
              <li className={style.cart__item} key={item.id}>
                <div className={style.cart__itemWrapper}>
                  <div className={style.cart__leftContainer}>
                    <button
                      className={style.cart__closeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <IconClose />
                    </button>
                    <Link
                      to={`../${item.category}/${item.itemId}`}
                      className={style.cart__linkItem}
                    >
                      <img
                        src={item.image}
                        alt="Gadget Photo"
                        className={style.cart__gadgetPhoto}
                      />
                    </Link>
                    <Link
                      to={`../${item.category}/${item.itemId}`}
                      className={style.cart__linkItem}
                    >
                      <p className={style.cart__gadgetName}>{item.name}</p>
                    </Link>
                  </div>

                  <div className={style.cart__rightContainer}>
                    <div className={style.cart__quantityButtons}>
                      <button
                        className={classNames(style.cart__quantityButton, {
                          [style.cart__darkTheme]: theme,
                          [style.cart__remainOneItemClass]:
                            getItemsQuantity(item.id) === 1,
                        })}
                        disabled={getItemsQuantity(item.id) === 1}
                        onClick={() => decreaseCartQuantity(item.id)}
                      >
                        {getItemsQuantity(item.id) === 1 ? (
                          <IconNotActiveMinus />
                        ) : (
                          <IconMinus />
                        )}
                      </button>
                      <span className={style.cart__count}>
                        {getItemsQuantity(item.id)}
                      </span>
                      <button
                        className={classNames(style.cart__quantityButton, {
                          [style.cart__darkTheme]: theme,
                        })}
                        onClick={() => increaseCartQuantity(item.id)}
                      >
                        <IconPlus />
                      </button>
                    </div>
                    <p className={style.cart__gadgetPrice}>${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {cartItems.length > 0 && (
            <div className={style.cart__priceContainer}>
              <div className={style.cart__priceWrap}>
                <div className={style.cart__totalWrap}>
                  <span className={style.cart__price}>${getTotalPrice}</span>
                  <span className={style.cart__totalItems}>
                    Total for {getTotalQuantity} items
                  </span>
                </div>

                <span className={style.cart__borderLine}></span>
                <button
                  className={style.cart__checkout}
                  onClick={() => setModalWindow(true)}
                >
                  {t('checkout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={style.cart__modalWindowContainer}>
        {modalWindow && <ModalWindow />}
      </div>
    </div>
  );
};
