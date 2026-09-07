import './CartPage.scss';
import cartEmpty from '../../images/cart-is-empty.png';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { CartItem } from '../../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { useTranslation } from 'react-i18next';

export const CartPage: React.FC = () => {
  const { productsOfCart } = useAppSelector(state => state.cart);

  const { theme } = useAppSelector(state => state.theme);

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const totalInitPrice = productsOfCart.reduce(
    (prev, acc) => prev + acc.price * acc.quantity,
    0,
  );

  const totalCartQuantity = productsOfCart.reduce(
    (prev, acc) => prev + acc.quantity,
    0,
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [productsOfCart]);

  return (
    <section className="cart">
      <div className="container">
        <button className="cart__back" onClick={() => navigate(-1)}>
          <img
            src={theme === 'light-theme' ? arrow : arrowDark}
            alt="Arrow"
            className="cart__back--img"
          />
          <p className="cart__back--text">{t('cartPage.back')}</p>
        </button>
        <h1 className="cart__title">{t('cartPage.title.text')}</h1>

        <div className="cart__content">
          {productsOfCart.length ? (
            <>
              <ul className="cart__list">
                {productsOfCart.map(product => {
                  return (
                    <li className="cart__item" key={product.id}>
                      <CartItem product={product} />
                    </li>
                  );
                })}
              </ul>

              <div className="cart__total">
                <div className="cart__total-priceBlock">
                  <p className="cart__total-price">{`$${totalInitPrice}`}</p>
                  <p className="cart__total-count">
                    {/* {productsOfCart.length === 1 */}
                    {totalCartQuantity === 1
                      ? `${t('cartPage.total.item')}`
                      : `${t('cartPage.total.items', { total: totalCartQuantity })}`}
                  </p>
                </div>

                <span className="cart__total-line"></span>

                <button
                  className="cart__total-button"
                  onClick={() => setIsOpen(true)}
                >
                  {t('cartPage.total.checkout')}
                </button>

                {isOpen && <Modal setIsOpen={setIsOpen} />}
              </div>
            </>
          ) : (
            <div className="cart__empty">
              <p className="cart__empty-title">{t('cartPage.title.empty')}</p>
              <img
                src={cartEmpty}
                alt="EmptyCart"
                className="cart__empty-img"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
