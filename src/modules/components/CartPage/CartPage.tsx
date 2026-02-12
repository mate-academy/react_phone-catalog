import React, { useContext, useEffect, useState } from 'react';
import './CartPage.scss';
import { SectionTitle } from '../../shared/components/TextSections/SectionTitle/SectionTitle';
import { BackButton } from '../../shared/components/Buttons/BackButton';
import { CartItem } from '../CartPage/components/CartItem';
import { calculateTotalSum } from '../../shared/servises/calculateSum';
import cartIsEmpty from '../../../global-assets/images/cart-is-empty.png';
import cartIsFilled from '../../../global-assets/images/cart-is-filled.png';
import {
  DispatchCartContext,
  StateCartContext,
} from '../../shared/reducer/CartReducer';
import { Modal } from '../../shared/components/Notifications/Modal';
import { CartStatusNotif } from './components/CartStatusNotif';
import { TranslationContext } from '../../../i18next/shared/TranslationContext';
import { getText } from '../../shared/servises/getText';
import { AnimatePresence, motion } from 'framer-motion';

export const CartPage: React.FC = () => {
  const { btnsTitle, notifMessage, navList, additionalText } =
    useContext(TranslationContext);
  const [modal, setModal] = useState(false);
  const cartState = useContext(StateCartContext);
  const cartDispatch = useContext(DispatchCartContext);
  const { cartList, cartFilled } = cartState;

  const cartPageTitle = navList.filter(i => i.link === 'cart')[0].title;
  const sum = calculateTotalSum(cartList);

  useEffect(() => {
    if (cartList.length > 0) {
      cartDispatch({ type: 'cartFilled', payload: true });
      setTimeout(() => {
        cartDispatch({ type: 'cartFilled', payload: false });
      }, 2000);
    }
  }, []);

  const handleModal = () => {
    setModal(true);
  };

  return (
    <>
      {modal && (
        <Modal
          type="cartModal"
          handleModal={setModal}
          message={notifMessage.cartModalMessage}
        />
      )}
      <div className="cart">
        {cartList.length === 0 ? (
          <CartStatusNotif
            cartType="cartEmpty"
            image={{ src: cartIsEmpty, alt: 'Cart is empty' }}
            message={notifMessage.cartEmptyNotif}
          />
        ) : (
          <div className="cart-content">
            {cartFilled ? (
              <CartStatusNotif
                cartType="cartFilled"
                image={{
                  src: cartIsFilled,
                  alt: 'Cart is filled',
                }}
                message={notifMessage.cartFilledNotif}
              />
            ) : (
              <>
                <div className="cart-content__header header">
                  <BackButton />
                  <SectionTitle text={cartPageTitle} />
                </div>
                <div className="cart-content__main">
                  <motion.div
                    className="cart-content__product-list"
                    layout
                    transition={{
                      layout: { duration: 0.1, ease: 'easeInOut' },
                    }}
                  >
                    <AnimatePresence>
                      {cartList.map(productItem => (
                        <CartItem product={productItem} key={productItem.id} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  <div className="cart-content__total-price">
                    <div className="cart-content__total-price__wrapper">
                      <div className="cart-content__total-price__sum">{`$${sum}`}</div>
                      <div className="cart-content__total-price__product-amount">
                        {`${getText(additionalText.cartProductAmount, cartList.length.toString())}`}
                      </div>
                      <button
                        onClick={handleModal}
                        className="cart-content__total-price__btn-confirm"
                      >
                        {btnsTitle.cartConfirmBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
