import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setFavorite, deleteFavorite } from '../../redux/favorites';
import { getFavorites, getProducts } from '../../redux';

export const FavoriteBtn = ({ productId, styleSize }: FavoriteBtnProps) => {
  const favorites: Product[] = useSelector(getFavorites);
  const products: Product[] = useSelector(getProducts);
  const dispatch = useDispatch();

  const addToFavorites = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, prodId: string) => {
      const product = products.find(p => p.id === prodId);

      if (e.target.checked) {
        dispatch(setFavorite(product));
      } else {
        dispatch(deleteFavorite(prodId));
      }
    }, [dispatch, products],
  );

  const isInFavorites = useMemo(() => (
    favorites.some(product => product.id === productId)
  ), [favorites, productId]);

  return (
    <label
      className={cn(
        'button-favorite', styleSize,
      )}
      htmlFor={`button-favorite__${productId}`}
    >
      <input
        className="button-favorite__input"
        type="checkbox"
        id={`button-favorite__${productId}`}
        checked={isInFavorites}
        onChange={(e) => addToFavorites(e, productId)}
      />
      <span className="button-favorite__checkmark" />
    </label>
  );
};
