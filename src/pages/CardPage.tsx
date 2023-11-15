/* eslint-disable no-prototype-builtins */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.scss';
// eslint-disable-next-line import/no-cycle
import { CardedProduct } from './components/CardedProduct';
import { useAppSelector } from '../app/hooks';
import { PopUp } from './components/PopUp';
// eslint-disable-next-line import/no-cycle
import { phoneCardSelector } from '../app/selector';

export const CardPage: FC = () => {
  const cardedPhones = useAppSelector(phoneCardSelector);
  const [popUpState, setPopUpState] = useState(false);

  const handlePopUp = () => {
    setPopUpState(true);
  };

  useEffect(() => {
    if (popUpState) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [popUpState]);

  return (
    <div className="card-page">
      <div className="card-page__container">
        {popUpState && (<PopUp setPopUpState={setPopUpState} />)}

        <Link className="card-page__back-link" to="..">
          <img
            className="card-page__back-link--img"
            src="images/icons/ArrowLeft.svg"
            alt="Back-button"
          />
          Back
        </Link>
        <h1 className="card-page__title">Cart</h1>
        {cardedPhones.length < 0 ? (
          <h1 className="info-messages">Add something to card...</h1>
        ) : (
          <div className="card-page__order-content order-content">
            <ul className="order-content__list-ored">
              {cardedPhones.map(card => (
                <li
                  className="order-content__item-ored item-ored"
                  key={card.id}
                >
                  <CardedProduct
                    card={card}
                  />
                </li>
              ))}
            </ul>
            <div className="order-content__checkout-block checkout-block">
              <p className="checkout-block__total-price-amout">{`$${cardedPhones.reduce((a, i) => a + (i.amount * i.value.price), 0)}`}</p>
              <p className="checkout-block__total-items-amout">{`Total for ${cardedPhones.reduce((a, i) => a + i.amount, 0)} items`}</p>
              <button
                type="button"
                className="checkout-block__checkout-button"
                onClick={() => handlePopUp()}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
