import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { AllActions, deleteFavoriteItem, loadFavoriteItem } from '../../../store/favoritesStore/favoriteStore';
import { favoriteItems } from '../../../store/fullStore/store';
import './FavoriteButton.scss';

type Props = {
  gadget: Gadget;
};

const FavoriteButton: React.FC<Props> = ({ gadget }) => {
  const favorites = useSelector(favoriteItems);
  const dispatch = useDispatch<Dispatch<AllActions>>();
  console.log(favorites);

  const isAddedToFavorites = (idItem: string) => (
    favorites.find(item => item.id === idItem)
  );

  return (
    <label
      htmlFor={gadget.id}
      className={cn(
        'favorites__button',
        { favorites__button_active: isAddedToFavorites(gadget.id) },
      )}
    >
      <input
        id={gadget.id}
        type="checkbox"
        className="favorites__button-input"
        onClick={() => {
          isAddedToFavorites(gadget.id)
            ? dispatch(deleteFavoriteItem(gadget.id))
            : dispatch(loadFavoriteItem(gadget));
        }}
      />

      <span
        className="favorites__button-check"
      />
    </label>
  );
};

export default FavoriteButton;
