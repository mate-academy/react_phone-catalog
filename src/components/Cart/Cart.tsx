import { useContext, useState } from 'react';
import { Product } from '../../types/Product';
import { CartContext, DispatchCartContext } from '../../store/CartContext';
import { getTotalPrice, getUniqueProducts } from '../../utils/helper';
import { CartItem } from '../CartItem';
import { CartEmpty } from '../CartEmpty';
import { CartModal } from '../CartModal';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const Cart = () => {
  const cartState = useContext(CartContext);
  const dispatchCart = useContext(DispatchCartContext);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const { t } = useTranslation();

  const totalPrice = getTotalPrice(cartState);

  const onModalAccept = () => dispatchCart({ type: 'clear' });

  return (
    <section className="cart">
      <h1 className="cart__title">{t(TRANSLATIONS.cart.title)}</h1>

      <div className="cart__content">
        {cartState.length ? (
          <>
            <ul className="cart__list">
              {getUniqueProducts(cartState).map((item: Product) => {
                return (
                  <li key={item.id} className="cart__item">
                    <CartItem product={item} />
                  </li>
                );
              })}
            </ul>

            <div className="cart__total">
              <div className="cart__total-price">
                <h2>${totalPrice}</h2>
                <p className="cart__total-subtitle">
                  {t(TRANSLATIONS.cart.total_interval, {
                    postProcess: 'interval',
                    count: cartState.length,
                  })}
                </p>
              </div>
              <div className="divider"></div>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setIsCheckout(true)}
                aria-label={t(TRANSLATIONS.cart.button.checkout.ariaLabel)}
              >
                {t(TRANSLATIONS.cart.button.checkout.text)}
              </button>
            </div>
          </>
        ) : (
          <CartEmpty />
        )}
      </div>

      {isCheckout && (
        <CartModal onAccept={onModalAccept} showModal={setIsCheckout} />
      )}
    </section>
  );
};
