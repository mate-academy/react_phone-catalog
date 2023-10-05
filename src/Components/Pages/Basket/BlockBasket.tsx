import './Basket.scss';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { Product } from '../../ProductCards/Product';
import Plus from './BasketImage/Plus.svg';
import Minus from './BasketImage/Minus.svg';
import CLose from './BasketImage/Close.svg';
import { useBasketContext }
  from '../../../core/context/FavoriteContext/FavoriteContext';

interface ProductCardsProps {
  product: Product,
}

export const BlockBasket = ({ product }: ProductCardsProps) => {
  const {
    phoneId,
    price,
    image,
    name,
  } = product;

  const {
    basket,
    changeQuantity,
    removeFromAllBasket,
  } = useBasketContext();

  const isBasket = basket.some((item) => item.id === phoneId.toString());

  const phoneModelInBasket = basket.find(
    (item) => item.id === phoneId.toString(),
  );

  const updatedPrice = price * (phoneModelInBasket?.quantity || 0);

  const handleDeleteClick = () => {
    if (isBasket) {
      removeFromAllBasket(phoneId.toString());
    }
  };

  const handleMinusClick = () => {
    if (phoneModelInBasket && phoneModelInBasket.quantity > 1) {
      changeQuantity(phoneId.toString(), -1);
    }
  };

  const handlePlusClick = () => {
    changeQuantity(phoneId.toString(), +1);
  };

  return (
    <>
      <div className="MainBlockBasket" key={phoneId}>
        <div className="block__MainBlockBasket-left-rigth">
          <div className="BlockBasket-first">
            <div className="BlockBasket-first__creff">
              <button
                type="button"
                data-cy="cartDeleteButton"
                className="iconsFromBasket-close"
                onClick={handleDeleteClick}
              >
                <img
                  src={CLose}
                  alt=""
                  className="iconsFromBasket__icon"
                />
              </button>
            </div>

            <div className="BlockBasket-first__imageText">
              <Link
                to={{
                  pathname: `/phones/${phoneId}`,
                }}
              >
                <img className="BlockBasket-first__image" src={`./new/${image}`} alt="" />
              </Link>
              <p className="BlockBasket-first__imageText-name">{name}</p>
            </div>
          </div>

          <div className="BlockBasket-two">
            <div className="BlockBasket-two__creff">
              {phoneModelInBasket && phoneModelInBasket.quantity <= 1 ? (
                <button
                  type="button"
                  className="iconsFromBasketNot"
                  onClick={handleMinusClick}
                >
                  <img
                    className="iconsFromBasket__icon"
                    src={Minus}
                    alt=""
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="iconsFromBasket"
                  onClick={handleMinusClick}
                >
                  <img
                    className="iconsFromBasket__icon"
                    src={Minus}
                    alt=""
                  />
                </button>
              )}

              <p className="BlockBasket-two__creff-count">
                {phoneModelInBasket ? phoneModelInBasket.quantity : 0}
              </p>
              <button
                type="button"
                className="iconsFromBasket"
                onClick={handlePlusClick}
              >
                <img
                  className="iconsFromBasket__icon"
                  src={Plus}
                  alt=""
                />
              </button>
            </div>

            <div className="BlockBasket-two__imageText">
              <h2 className="BlockBasket-two__imageText-price">{`$${updatedPrice}`}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
