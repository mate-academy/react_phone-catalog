import { useContext } from 'react';
import { motion } from 'framer-motion';

import { CartContext } from '../../contexts/CartContextProvider';
import { ButtonBack } from '../../components/Button/ButtonBack/ButtonBack';
import { CartItemList } from './CartItemList/CartItemList';
import { CartInfo } from './CartInfo/CartInfo';

import './CartPage.scss';
import { motionParametr } from '../../helpers/motionParametr';

export const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <motion.section
      className="cart-page container"
      {...motionParametr}
    >
      <div className="cart-page--back-button">
        <ButtonBack />
      </div>

      <h1>
        Cart
      </h1>

      <div className="cart-page__content">
        {cart.length ? (
          <>
            <div className="cart-page__list">
              <CartItemList />
            </div>

            <CartInfo />
          </>
        ) : (
          <h2>
            Your cart is empty
          </h2>
        )}
      </div>
    </motion.section>
  );
};
