import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasket, deleteItem } from '../../store/basket';
import { setFavorite } from '../../store/favorite';
import { getFavorite, getBasket } from '../../store/index';
import { Product } from '../../interfaces';

interface Props {
  goodItem: Product;
}

export const AddButton: React.FC<Props> = ({ goodItem }) => {
  const basket = useSelector(getBasket);
  const favorite = useSelector(getFavorite);
  const isAddedToBasket = basket.find(item => item.id === goodItem.id);
  const isFavorite = favorite.find(item => item.id === goodItem.id);
  const dispatch = useDispatch();
  const handleClickAddToBasket = (good: Product) => {
    dispatch(setBasket(good));
  };

  const removeFromToBasket = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleClickAddFavorite = (good: Product) => {
    dispatch(setFavorite(good));
  };

  return (
    <div className="buttons__container">
      {
        !isAddedToBasket
          ? (
            <button
              type="button"
              className="button card__button--add"
              onClick={() => handleClickAddToBasket(goodItem)}
            >
              Add to cart
            </button>
          )
          : (
            <button
              type="button"
              className="button card__button--remove"
              onClick={() => removeFromToBasket(goodItem.id)}
            >
              Remove
            </button>
          )
      }

      <button
        type="button"
        className="button card__button--choose"
        onClick={() => handleClickAddFavorite(goodItem)}
      >
        {
          !isFavorite
            ? <img src="img/images/favorite.svg" alt="favorite" className="favorite" />
            : <img src="img/images/heart.svg" alt="favorite" className="favorite" />
        }

      </button>
    </div>
  );
};
