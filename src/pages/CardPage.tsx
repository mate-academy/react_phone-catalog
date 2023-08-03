/* eslint-disable no-prototype-builtins */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.scss';
import { CardedProduct } from './components/CardedProduct';
import { Product } from '../types/Product';
import { useAppSelector } from '../app/hooks';

type SavedCard = {
  id: string,
  amount: number,
  value: Product,
};

export const CardPage: FC = () => {
  const cardedPhones = useAppSelector(state => state.phonesCarded.value);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(() => {
    const savedOrderedCards = window.localStorage.getItem('cardedPhones');

    if (savedOrderedCards) {
      return JSON.parse(savedOrderedCards);
    }

    const saveCard = (): SavedCard[] => {
      const result = cardedPhones.map(phone => (
        {
          id: phone.id,
          amount: 1,
          value: phone,
        }
      ));

      return result;
    };

    const res = saveCard();

    return res;
  });
  const [totalItems, setTotalItems] = useState<number>(savedCards.length || 0);
  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const result = window.localStorage.getItem('totalAmount') || 0;

    return +result;
  });

  useEffect(() => {
    const alredySavedCardsJSON = window.localStorage.getItem('cardedPhones');

    if (cardedPhones && cardedPhones.length > 0 && alredySavedCardsJSON) {
      const alredySavedCards: SavedCard[] = JSON.parse(alredySavedCardsJSON);
      const newCardsForSave: SavedCard[] = [];
      const result = alredySavedCards.map(card => {
        if (cardedPhones.find(phone => phone.id === card.id)) {
          return {
            ...card,
            amount: card.amount + 1,
          };
        }

        return card;
      });

      cardedPhones.forEach(phone => {
        if (result.find(card => card.id === phone.id)) {
          newCardsForSave.push({
            id: phone.id,
            amount: 1,
            value: phone,
          });
        }
      });

      if ([...result, ...newCardsForSave].length > 0) {
        window.localStorage.setItem(
          'cardedPhones', JSON.stringify([...result, ...newCardsForSave]),
        );

        const getItem = window.localStorage.getItem('cardedPhones');

        if (getItem) {
          setSavedCards(JSON.parse(getItem));
        }
      }
    } else {
      const newCardForSaveFromZero = cardedPhones.map(phone => (
        {
          id: phone.id,
          amount: 1,
          value: phone,
        }
      ));

      if (newCardForSaveFromZero.length > 0) {
        window.localStorage.setItem(
          'savedCards', JSON.stringify(newCardForSaveFromZero),
        );
      }

      const getItem = window.localStorage.getItem('cardedPhones');

      if (getItem) {
        setSavedCards(JSON.parse(getItem));
      }
    }

    setTotalAmount(
      savedCards.reduce(
        (
          sum: number, card: SavedCard,
        ) => sum + (+card.value.price * card.amount), 0,
      ),
    );
    setTotalItems(savedCards.reduce((accom, card) => accom + +card.amount, 0));
  }, [cardedPhones || savedCards]);

  return (
    <div className="card-page">
      <Link className="card-page__back-link" to="..">
        <img
          className="card-page__back-link--img"
          src="images/icons/ArrowLeft.svg"
          alt="Back-button"
        />
        Back
      </Link>
      <h1 className="card-page__title">Cart</h1>
      {savedCards
        && savedCards.length === 0
        && <h1 className="info-messages">Add something to card...</h1>}
      <div className="card-page__order-content order-content">
        <ul className="order-content__list-ored">
          {savedCards.map(phone => (
            <li className="order-content__item-ored item-ored" key={phone.id}>
              <CardedProduct
                product={phone.value}
                onTotalAmount={setTotalAmount}
              />
            </li>
          ))}
        </ul>
        <div className="order-content__checkout-block checkout-block">
          <p className="checkout-block__total-price-amout">{`$${totalAmount}`}</p>
          <p className="checkout-block__total-items-amout">{`Total for ${totalItems} items`}</p>
          <button type="button" className="checkout-block__checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
