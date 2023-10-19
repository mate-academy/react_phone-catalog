import classNames from 'classnames';
import { useContext, useState } from 'react';
import {
  addHandler, findItem, parseStorage,
} from '../../Helpers/functions/storage-helpers';
import { Product } from '../../Helpers/types/Product';
import { FavContext } from '../Context/FavContextProvider';

type Props = {
  id: string,
  product: Product,
  isLarge: boolean,
};

export const ToFavButton: React.FC<Props> = ({ id, product, isLarge }) => {
  const { fav, setFav } = useContext(FavContext);
  const [isInFav, setIsInFav] = useState(
    findItem(parseStorage('FavItems'), id),
  );

  return (
    <button
      type="button"
      className={classNames(
        'icon',
        'icon--fav',
        { 'icon--fav--active': isInFav },
        { 'icon--fav--large': isLarge },
      )}
      aria-label="fav"
      data-cy="addToFavorite"
      onClick={() => addHandler(
        'FavItems',
        {
          id,
          quantity: 1,
          product,
        },
        setIsInFav,
        setFav,
        fav,
      )}
    />
  );
};
