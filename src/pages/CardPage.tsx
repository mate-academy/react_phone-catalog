/* eslint-disable no-prototype-builtins */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.scss';
// eslint-disable-next-line import/no-cycle
import { CardedProduct } from './components/CardedProduct';
import { Product } from '../types/Product';
import { useAppSelector } from '../app/hooks';
import { PopUp } from './components/PopUp';
// eslint-disable-next-line import/no-cycle
import { phoneCardSelector } from '../app/selector';

export type SavedCard = {
  id: string,
  amount: number,
  value: Product,
};

export enum KeyJson {
  CARD = 'cardedPhones',
  DETAILS = 'productDetails',
}

export const CardPage: FC = () => {
  const cardedPhones = useAppSelector(phoneCardSelector);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(() => {
    const savedOrderedCards = window.localStorage.getItem(KeyJson.CARD);

    if (savedOrderedCards) {
      return JSON.parse(savedOrderedCards);
    }

    return [];
  });
  const [totalItems, setTotalItems] = useState<number>(() => {
    const savedOrderedCards = window.localStorage.getItem(KeyJson.CARD);

    if (savedOrderedCards) {
      return JSON.parse(savedOrderedCards).reduce(
        (a: number, i: SavedCard) => a + i.amount, 0,
      );
    }

    return cardedPhones.length;
  });
  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const savedOrderedCards = window.localStorage.getItem(KeyJson.CARD);

    if (savedOrderedCards) {
      return JSON.parse(savedOrderedCards).reduce(
        (a: number, i: SavedCard) => a + (i.amount * i.value.price), 0,
      );
    }

    return cardedPhones.reduce((a, i) => a + i.price, 0);
  });
  const [popUpState, setPopUpState] = useState(false);

  const handlePopUp = () => {
    setPopUpState(true);
  };

  useEffect(() => {
    if (savedCards.length === 0 && cardedPhones) {
      const newCardForSaveFromZero = cardedPhones.map(phone => (
        {
          id: phone.id,
          amount: 1,
          value: phone,
        }
      ));

      setSavedCards(newCardForSaveFromZero);
      window.localStorage.setItem(
        KeyJson.CARD, JSON.stringify(newCardForSaveFromZero),
      );

      const priceCards = newCardForSaveFromZero.reduce(
        (a, i) => a + i.value.price, 0,
      );

      setTotalAmount(priceCards);
      setTotalItems(newCardForSaveFromZero.length);
    }

    if (savedCards.length > 0) {
      const alredySavedCardsJSON = window.localStorage.getItem(KeyJson.CARD);

      if (alredySavedCardsJSON) {
        const alredySavedCards: SavedCard[] = JSON.parse(alredySavedCardsJSON);
        const newCardsForSave: SavedCard[] = [];

        cardedPhones.forEach(phone => {
          if (alredySavedCards.every(card => card.id !== phone.id)) {
            newCardsForSave.push({
              id: phone.id,
              amount: 1,
              value: phone,
            });
          }
        });

        window.localStorage.setItem(
          KeyJson.CARD, JSON.stringify([...savedCards, ...newCardsForSave]),
        );
        setSavedCards(prev => ([...prev, ...newCardsForSave]));
        const priceNewCards = newCardsForSave.reduce(
          (a, i) => a + i.value.price, 0,
        );

        setTotalAmount(prev => (prev + priceNewCards));
        setTotalItems(prev => prev + newCardsForSave.length);
      }
    }
  }, []);

  return (
    <div className="card-page">
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
      {savedCards.length < 0 ? (
        <h1 className="info-messages">Add something to card...</h1>
      ) : (
        <div className="card-page__order-content order-content">
          <ul className="order-content__list-ored">
            {savedCards.map(phone => (
              <li className="order-content__item-ored item-ored" key={phone.id}>
                <CardedProduct
                  card={phone}
                  onTotalAmount={setTotalAmount}
                  onTotalItem={setTotalItems}
                  onSavedCards={setSavedCards}
                />
              </li>
            ))}
          </ul>
          <div className="order-content__checkout-block checkout-block">
            <p className="checkout-block__total-price-amout">{`$${totalAmount}`}</p>
            <p className="checkout-block__total-items-amout">{`Total for ${totalItems} items`}</p>
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
  );
};
