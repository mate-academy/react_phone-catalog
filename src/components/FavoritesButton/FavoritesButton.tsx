import { IconFavorite } from '../../shared/IconFavorite/IconFavorite';
import { SecondaryButton } from '../SecondaryButton';
import favoritesButtonStyles from './FavoritesButton.module.scss';
import {
  FavoritesContextActionType,
  useFavoritesDispatch,
  useFavoritesStateValue,
} from '../../context';
import { Product } from '../../shared/types';
import { IconFavoriteSelected } from '../../shared/IconFavoriteSelected';

type Props = {
  product: Product;
};

export const FavoritesButton = ({ product }: Props) => {
  const dispatch = useFavoritesDispatch();
  const isProductInFavorites = useFavoritesStateValue().products.some(
    p => p.id === product.id,
  );

  return (
    <div className={favoritesButtonStyles.favoritesButton}>
      <SecondaryButton
        onClick={() =>
          dispatch({
            type: FavoritesContextActionType.TOGGLE_FAVORITE,
            payload: product,
          })
        }
      >
        {isProductInFavorites ? <IconFavoriteSelected /> : <IconFavorite />}
      </SecondaryButton>
    </div>
  );
};
