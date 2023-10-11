import { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import { CartContext } from '../../../contexts/CartContextProvider';
import { getCartPrice } from '../../../helpers/getCartPrice';

import './CartInfo.scss';

export const CartInfo = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, currentItem) => (
    currentItem.quantity + total
  ), 0);

  const handleCheckoutClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  const checkoutAnimate = {
    enter: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
        animationTimingFunction: 'ease-in-out',
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        animationTimingFunction: 'ease-in-out',
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  const checkoutBlockAnimate = {
    enter: {
      height: '278px',
      transition: {
        duration: 0.3,
        animationTimingFunction: 'ease-in-out',
      },
    },
    exit: {
      height: '142px',
      transition: {
        duration: 0.6,
        animationTimingFunction: 'ease-in-out',
      },
    },
  };

  return (
    <motion.div
      className="cart-info"
      initial="exit"
      animate={isClicked ? 'enter' : 'exit'}
      variants={checkoutBlockAnimate}
    >
      <div className="cart-info__content">
        <div className="cart-info__total-price">
          <h1>
            {`$${getCartPrice(cart)}`}
          </h1>

          <div className="cart-info__total-price--quantity">
            {`
              Total for
              ${totalItems}
              ${totalItems <= 1 ? 'item' : 'items'}
            `}
          </div>
          <div className="cart-info__bottom">
            <motion.button
              type="button"
              className="cart-info--button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </motion.button>

          </div>
        </div>
        <motion.h2
          className="cart-info--checkout-text"
          initial="exit"
          animate={isClicked ? 'enter' : 'exit'}
          variants={checkoutAnimate}
        >
          {'Sorry, this feature isn\'t inplement yet'}
        </motion.h2>
      </div>
    </motion.div>
  );
};
