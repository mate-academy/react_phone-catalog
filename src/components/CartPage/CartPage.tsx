import React, { useContext, useState } from 'react';
import CartItem from './CartItem/CartItem';
import './CartPageStyle.scss';
import { StateContext } from 'src/store';
import { useNavigate } from 'react-router-dom';
import AnimatedTitle from '../ui/AnimatedTitle/AnimatedTitle';
import Modal from './Modal/Modal';

const CartPage = () => {
  const { cart } = useContext(StateContext);
  const navigate = useNavigate();
  const isItems = cart.length > 0;
  const [activeMoval, setActiveModal] = useState(false);

  const priceOfGadgets = cart.reduce((acc, cur) => {
    return acc + cur.fullPrice * cur.amount;
  }, 0);

  const totalAmountOfItems = cart.reduce((acc, cur) => {
    return acc + 1 * cur.amount;
  }, 0);

  const goBack = () => {
    navigate(-1);
  };

  const handleSetModal = () => {
    setActiveModal(false);
  };

  return (
    <div className="cartPage container">
      {activeMoval && <Modal handleSetModal={handleSetModal} />}
      <div className="cartPage__wrapper">
        <div className="cartPage__main">
          <button className="cartPage__back" onClick={() => goBack()}>
            <img
              src="icons/arrow-up-black.png"
              alt=""
              className="cartPage__back--img"
            />
            <div className="cartPage__back--text">Back</div>
          </button>
          <AnimatedTitle text="Cart" />
          {isItems ? (
            <div className="cartPage__cards">
              {cart.map(elem => (
                <CartItem item={elem} key={elem.id} />
              ))}
            </div>
          ) : (
            <div className="cartPage__no-items">
              <img
                src="icons/Discovery-cuate.png"
                alt=""
                className="cartPage__no-items--image"
              />
              <h5 className="cartPage__no-items--text">No items Selected</h5>
            </div>
          )}
        </div>
        <div className="cartPage__footer">
          <div className="cartPage__info">
            <h2 className="cartPage__price">${priceOfGadgets}</h2>
            <div className="cartPage__couter-item">
              Total for {totalAmountOfItems} items
            </div>
          </div>
          <hr className="cartPage__line" />
          <button
            className="cartPage__button-checkout"
            onClick={() => setActiveModal(true)}
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
