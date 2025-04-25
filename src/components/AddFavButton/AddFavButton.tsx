import { useCallback, useState } from 'react';
import { useStateContext } from '../../state/state';
import { ProductType } from '../../types/ProductType';
import style from './AddFavButton.module.scss';
import { ActionTypes } from '../../enums/ActionTypes';
import { Button } from '../Button/Button';

interface Props {
  product: ProductType;
  isFavourite?: boolean;
  children: React.ReactNode;
}

export const AddFavButton: React.FC<Props> = ({
  product,
  isFavourite,
  children,
}) => {
  const { dispatch } = useStateContext();
  const [localIsFavourite, setLocalIsFavourites] = useState(isFavourite);

  const handleAddFavourite = useCallback(() => {
    setLocalIsFavourites(!localIsFavourite);

    if (localIsFavourite) {
      dispatch({
        type: ActionTypes.REMOVE_FROM_FAVOURITES,
        payload: product.itemId,
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_TO_FAVOURITES,
        payload: product,
      });
    }
  }, [localIsFavourite, dispatch, product]);

  return (
    <Button
      onClick={handleAddFavourite}
      className={`${style.add_to_fav_button} ${localIsFavourite ? style.fav_selected : ''}`}
      selected={localIsFavourite}
    >
      {children}
    </Button>
  );
};
