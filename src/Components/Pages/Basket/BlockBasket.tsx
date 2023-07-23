import './Basket.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Product } from '../../ProductCards/Product';
import Plus from './BasketImage/Plus.svg';
import Minus from './BasketImage/Minus.svg';
import CLose from './BasketImage/Close.svg';
import { useBasketContext } from '../../../FavoriteContext';

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
    removeFromBasket,
  } = useBasketContext();

  const isBasket = basket.includes(phoneId.toString())
   || basket.includes(phoneId.toString());
  const [phoneModelCountInBasket, setPhoneModelCountInBasket]
   = useState<number>(
     basket.filter((productId) => productId === phoneId.toString()).length,
   );

  const updatedPrice = price * phoneModelCountInBasket;

  const handleDeleteClick = () => {
    if (isBasket) {
      removeFromBasket(phoneId.toString());
    }
  };

  const handleMinusClick = () => {
    if (phoneModelCountInBasket > 1) {
      setPhoneModelCountInBasket((prevCount) => prevCount - 1);
    }
  };

  const handlePlusClick = () => {
    setPhoneModelCountInBasket((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div className="MainBlockBasket" key={phoneId}>
        <div className="block__MainBlockBasket-left-rigth">
          <div className="BlockBasket-first">
            <div className="BlockBasket-first__creff">
              <button
                type="button"
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
              <p
                className="BlockBasket-two__creff-count"
              >
                {phoneModelCountInBasket}
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
