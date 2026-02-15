/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.scss';
import { GeneralContext } from '../../helpers/GeneralContext';
import { CartItem } from '../../components/CartItem';
import { Checkout } from '../../components/Checkout';

export const CartPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { cartList } = useContext(GeneralContext);
  const totalPrice = cartList.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
  const totalNumber = cartList.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="cartPage">
      <div className="cartPage__header">
        <Link to="/" className="cartPage__go-back" onClick={() => goBack()}>
          <img
            src={require('../../images/icons/back-arrow.svg').default}
            alt="Arrow"
          />
          <span>Back</span>
        </Link>

        <h1 className="title cartPage__title">Cart</h1>
      </div>

      {cartList.length > 0 ? (
        <div className="cartPage__content">
          <div className="cartPage__itemsList">
            {cartList.map(product => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>

          <div className="cartPage__total">
            <div className="cartPage__tital-price">{`$${totalPrice}`}</div>

            <div className="cartPage__total-number" data-cy="productQauntity">
              {`Total for ${totalNumber} items`}
            </div>

            <div className="cartPage__divider" />

            <button
              type="button"
              className="cartPage__checkout"
              onClick={() => setShowMessage(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="emptyMessage">Your cart is empty</div>
      )}

      {showMessage && <Checkout setShowMessage={setShowMessage} />}
    </div>
  );
};
