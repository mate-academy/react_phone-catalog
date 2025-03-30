import classNames from 'classnames';
import React, { useContext } from 'react';
import { FavouritesContext } from '../../../../Store/FavouritesStore';
import { UpdatedProduct } from '../../Types/types';
import { isAddedToList, newListOfSavedItems } from './utils/utilsFunctions';
import { CartStoreContext } from '../../../../Store/CartStore';

interface Props {
  item: UpdatedProduct;
}

export const ActionButtons: React.FC<Props> = ({ item }) => {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cartList, setCartList } = useContext(CartStoreContext);

  return (
    <div className="buttons">
      <button
        onClick={() => setCartList(newListOfSavedItems(item, cartList))}
        className={classNames('buttons__button-cart', {
          'buttons__button-cart--is-in-cart': isAddedToList(item, cartList),
        })}
      >
        {isAddedToList(item, cartList) ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        onClick={() => setFavourites(newListOfSavedItems(item, favourites))}
        className={classNames('buttons__button-favorites', {
          'buttons__button-favorites--is-added': isAddedToList(
            item,
            favourites,
          ),
        })}
      />
    </div>
  );
};
