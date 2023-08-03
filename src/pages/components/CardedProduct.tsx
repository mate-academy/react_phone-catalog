/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { FC, useEffect, useReducer } from 'react';
import { Product } from '../../types/Product';
import { useAppDispatch } from '../../app/hooks';
import {
  unsetFromCardPhone,
} from '../../features/PhonesInCard/phonesInCardSlice';
// eslint-disable-next-line import/no-cycle
import { KeyJson, SavedCard } from '../CardPage';

type Props = {
  card: SavedCard,
  onTotalAmount: React.Dispatch<React.SetStateAction<number>>,
  onTotalItem: React.Dispatch<React.SetStateAction<number>>,
  onSavedCards: React.Dispatch<React.SetStateAction<SavedCard[]>>,
};

function reducer(
  state: {
    count: number,
  },
  action: {
    type: string,
  },
) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export const CardedProduct: FC<Props> = ({
  card,
  onTotalAmount,
  onTotalItem,
  onSavedCards,
}) => {
  const initialState = { count: card.amount };
  const [state, dispatcher] = useReducer(reducer, initialState);
  const dispatch = useAppDispatch();

  const handleUnsetProduct = (good: Product) => {
    dispatch(unsetFromCardPhone(good));
    onTotalAmount(prev => (prev - (state.count * card.value.price)));
    onTotalItem(prev => (prev - state.count));
    const cardsFromStorageJSON = window.localStorage.getItem(KeyJson.CARD);

    if (cardsFromStorageJSON) {
      const filteredCards = JSON.parse(
        cardsFromStorageJSON,
      ).filter((c: SavedCard) => c.id !== card.id);

      window.localStorage.setItem(KeyJson.CARD, JSON.stringify(filteredCards));
      onSavedCards(filteredCards);
    }
  };

  const handleCounter = (actionType: string) => {
    switch (actionType) {
      case 'decrement':
        if (state.count > 1) {
          onTotalAmount(prev => (prev - +card.value.price));
          dispatcher({ type: actionType });
          onTotalItem(prev => (prev - 1));
        }

        break;
      case 'increment':
        onTotalAmount(prev => (prev + +card.value.price));
        dispatcher({ type: actionType });
        onTotalItem(prev => (prev + 1));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const savedCard = window.localStorage.getItem(KeyJson.CARD);

    if (savedCard) {
      const update = JSON.parse(savedCard).map((currentCard: SavedCard) => {
        if (card.id === currentCard.id) {
          return {
            ...currentCard,
            amount: state.count,
          };
        }

        return currentCard;
      });

      window.localStorage.setItem(KeyJson.CARD, JSON.stringify(update));
    }
  }, [state.count]);

  return (
    <>
      <button
        className="item-ored__delete-button"
        type="button"
        onClick={() => handleUnsetProduct(card.value)}
      >
        <img
          className="item-ored__delete-button--icon"
          src="images/icons/CloseButton.svg"
          alt="Close"
        />
      </button>
      <img
        className="item-ored__product-img"
        src={card.value.image || card.value.imageUrl}
        alt="Phone"
      />
      <h2 className="item-ored__product-name">
        {card.value.name}
      </h2>
      <button
        className="item-ored__product-count-deg"
        type="button"
        onClick={() => handleCounter('decrement')}
      >
        -
      </button>
      <p className="item-ored__count-value">{state.count}</p>
      <button
        type="button"
        className="item-ored__product-count-inc"
        onClick={() => handleCounter('increment')}
      >
        +
      </button>
      <p className="item-ored__price-product">{`$${card.value.price}`}</p>
    </>
  );
};
