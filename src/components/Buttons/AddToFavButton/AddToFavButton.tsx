import React, { useCallback, useState } from 'react';
import './AddToFavButton.scss';
import { Button } from '../Button';
import { Product } from '../../../types';
import { useStateContext } from '../../../state/state';
import { ActionTypes } from '../../../enums';

type Props = {
  product: Product;
  children: React.ReactNode;
  isFavourite?: boolean;
};

export const AddToFavButton: React.FC<Props> = React.memo(
  ({ children, product, isFavourite }) => {
    const { dispatch } = useStateContext();
    const [localIsFavourite, setLocalIsFavourite] = useState(isFavourite);

    const handleAddToFavorite = useCallback(() => {
      setLocalIsFavourite(!localIsFavourite);

      if (localIsFavourite) {
        dispatch({
          type: ActionTypes.REMOVE_FROM_FAVOURITES,
          payload: product.itemId,
        });
      } else {
        dispatch({ type: ActionTypes.ADD_TO_FAVOURITES, payload: product });
      }
    }, [localIsFavourite, dispatch, product]);

    return (
      <Button
        shape="round"
        onClick={handleAddToFavorite}
        className="add-to-fav-button"
        selected={localIsFavourite}
      >
        {children}
      </Button>
    );
  },
);

AddToFavButton.displayName = 'AddToFavButton';
