import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './BasketPage.scss';
import { BackButton } from '../../components/BackButton';
import { EmptyPage } from '../EmptyPage';
import { Modal } from '../../components/Modal';
import { useFooter } from '../../context/FooterContext';

export const BasketPage: React.FC = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setIsShow } = useFooter();
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.phone.priceRegular * item.quantity,
      0,
    );
  };

  const handleCheckoutClick = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    clearCart();
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  if (cartItems.length === 0) {
    setIsShow(false);
  } else {
    setIsShow(true);
  }

  return (
    <div className="basket container">
      <BackButton title="Basket" />
      <h2 className="basket__title">Basket</h2>
      <p className="basket__length">{cartItems.length} items</p>
      <div className="basket__content">
        <div className="basket__wrapper">
          {cartItems.length === 0 ? (
            <div className="basket__empty">
              <EmptyPage />
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.phone.id} className="basket__itemGoods">
                  <div className="basket__remove">
                    <img
                      src="./img/icons/closeMenu.svg"
                      alt="remove"
                      className="basket__remove--icon"
                      onClick={() => removeItem(item.phone.id)}
                    />
                    <img
                      className="basket__imgGoods"
                      src={item.phone.images[0]}
                      alt={item.phone.name}
                    />
                    <p className="basket__nameGoods">{item.phone.name}</p>
                  </div>
                  <div className="basket__add">
                    <div className="basket__quantityGoods">
                      <p
                        className={`basket__quantityGoods--minus ${
                          item.quantity === 1
                            ? 'basket__quantityGoods--disabled'
                            : ''
                        }`}
                        onClick={() =>
                          item.quantity > 1 && decreaseQuantity(item.phone.id)
                        }
                      >
                        -
                      </p>
                      <p className="basket__countGoods">{item.quantity}</p>
                      <p
                        className="basket__quantityGoods--plus"
                        onClick={() => increaseQuantity(item.phone.id)}
                      >
                        +
                      </p>
                    </div>
                    <p className="basket__priceGoods">
                      ${item.phone.priceRegular * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="total">
            <p className="total__ubtitle">${getTotalPrice()}</p>
            <p className="total__subtitle">
              Total for {cartItems.length} items
            </p>
            <hr className="total__hr" />
            <button className="total__button" onClick={handleCheckoutClick}>
              Checkout
            </button>
          </div>
        )}
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};
