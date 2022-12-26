import { FC } from 'react';
import classNames from 'classnames';
import './ToFavoritesButton.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { actions as favoritesActions } from '../../../features/favorites';
import { Product } from '../../../types/Product';

type Props = {
  width: string;
  height: string;
  product: Product;
};

export const ToFavoritesButton: FC<Props> = ({ width, height, product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);
  const isAdded = favorites.some(
    favoritesItem => favoritesItem.id === product.id,
  );

  const styles = { width, height };

  const add = () => {
    dispatch(favoritesActions.add(product));
  };

  const remove = () => {
    dispatch(favoritesActions.remove(product));
  };

  return (
    <button
      type="button"
      data-cy="addToFavorite"
      className={classNames(
        'to-favorites-button',
        { 'to-favorites-button--active': isAdded },
      )}
      aria-label="add-to-favorites"
      style={styles}
      onClick={isAdded ? remove : add}
    />
  );
};
