import React, { useCallback, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { useStateContext } from '../../state/state';
import { ActionTypes } from '../../enums/ActionTypes';
import style from './AddFavButton.module.scss';
import { Button } from '../Button/Button';

interface Props {
  product: ProductType;
  children: React.ReactNode;
  isFavourite?: boolean;
}

export const AddFavButton: React.FC<Props> = React.memo(
  ({ children, product, isFavourite }) => {
    const { dispatch } = useStateContext();
    const [localIsFavourite, setLocalIsFavourite] = useState(isFavourite);

    const handleAddFavourite = useCallback(() => {
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
        onClick={handleAddFavourite}
        className={style.add_to_fav_button}
        selected={localIsFavourite}
      >
        {children}
      </Button>
    );
  },
);

AddFavButton.displayName = 'AddToFavButton';
