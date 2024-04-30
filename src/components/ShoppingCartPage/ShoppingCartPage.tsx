import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ShoppingCartPage.scss';
import { PathBlock } from '../utils/Path';
import { useDeviceContext } from '../DeviceContext/DeviceContext';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';
import { useTranslation } from 'react-i18next';

export const ShoppingCartPage: React.FC = () => {
  const { shoppingCart, handleClearCart } = useDeviceContext();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const totalPrice = () => {
    let total = 0;

    shoppingCart.forEach(item => {
      total += item.price * item.count;
    });

    return total;
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    handleClearCart();
    setShowModal(false);
  };

  useEffect(() => {
    document.title = 'Cart';
  }, []);

  return (
    <div className="container">
      <div className="shoppingCartPage">
        <PathBlock isOnlyBack />
        <h1 className="shoppingCartPage__title">{t('Cart')}</h1>
        {!shoppingCart.length && <h2>{t('Cart empty')}</h2>}
        {!!shoppingCart.length && (
          <div className="shoppingCartPage__wrapper">
            <TransitionGroup className={'shoppingCart__wrapper'}>
              {shoppingCart.map(cart => (
                <CSSTransition key={cart.id} timeout={300} classNames="item">
                  <ShoppingCart shopCart={cart} key={cart.id} />
                </CSSTransition>
              ))}
            </TransitionGroup>
            <div className="shoppingCart__total">
              <div className="shoppingCart__total--text-block">
                <h2 className="shoppingCart__total--price">{`$${totalPrice()}`}</h2>
                <p className="shoppingCart__total--items body-text">
                  {t('p.total', { length: shoppingCart.length })}
                </p>
              </div>
              <div className="shoppingCart__total--line"></div>
              <button
                className="shoppingCart__total--button button-primary button"
                onClick={handleShowModal}
              >
                {t('Checkout')}
              </button>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal__window">
            <h4 className="modal__text">{t('Checkout text')}</h4>
            <div className="modal__buttons">
              <button
                className="modal__buttons--cancel button button-primary"
                onClick={handleCloseModal}
              >
                {t('Cancel')}
              </button>
              <button
                className="modal__buttons--confirm button button-primary"
                onClick={handleConfirm}
              >
                {t('Confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
