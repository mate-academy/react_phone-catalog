import React from 'react';
import { useCart } from '../../context/CartContext';
import './BasketPage.scss';
import { BackButton } from '../../components/BackButton';
import { EmptyPage } from '../EmptyPage';

export const BasketPage: React.FC = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useCart();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.phone.priceRegular * item.quantity,
      0,
    );
  };

  return (
    <div className="basket container">
      <BackButton title="Basket" />

      <h2 className="basket__title">Basket</h2>
      <div className="basket__wrapper">
        {cartItems.length === 0 ? (
          <EmptyPage />
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
                      className="basket__quantityGoods--plus"
                      onClick={() => increaseQuantity(item.phone.id)}
                    >
                      +
                    </p>
                    <p className="basket__countGoods">{item.quantity}</p>
                    <p
                      className={`basket__quantityGoods--minus ${item.quantity === 1 ? 'basket__quantityGoods--disabled' : ''}`}
                      onClick={() =>
                        item.quantity > 1 && decreaseQuantity(item.phone.id)
                      }
                    >
                      -
                    </p>
                  </div>
                  <p className="basket__priceGoods">
                    ${item.phone.priceRegular * item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="basket__total">
              <p>Total Price: ${getTotalPrice()}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
