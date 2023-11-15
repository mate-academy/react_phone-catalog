/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
  decrease,
  increase,
  unsetFromCardPhone,
} from '../../features/PhonesInCard/phonesInCardSlice';
import { SavedCard } from '../../types/SavedCard';

type Props = {
  card: SavedCard,
};

export const CardedProduct: FC<Props> = ({
  card,
}) => {
  const dispatch = useAppDispatch();

  const handleUnsetProduct = () => {
    dispatch(unsetFromCardPhone(card.value));
  };

  const handleCounter = (type: string) => {
    switch (type) {
      case 'decrease':
        dispatch(decrease(card));
        break;
      case 'increase':
        dispatch(increase(card));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="img-container">
        <button
          className="item-ored__delete-button"
          type="button"
          onClick={() => handleUnsetProduct()}
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
      </div>
      <h2 className="item-ored__product-name">
        {card.value.name}
      </h2>
      <div className="count-container">
        <button
          className="item-ored__product-count-deg"
          type="button"
          onClick={() => handleCounter('decrease')}
        >
          -
        </button>
        <p className="item-ored__count-value">{card.amount}</p>
        <button
          type="button"
          className="item-ored__product-count-inc"
          onClick={() => handleCounter('increase')}
        >
          +
        </button>
      </div>
      <p className="item-ored__price-product">{`$${card.value.price}`}</p>
    </>
  );
};
