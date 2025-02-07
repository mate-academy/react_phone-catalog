import classNames from 'classnames';
import { FullHeartSVG } from '../SVGs/FullHeartSVG';
import { HeartSVG } from '../SVGs/HeartSVG';
import styles from './FavouriteButton.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { Product } from '../../types/types';
import { useFavourites } from '../Contexts/FavouritesContext';
import { useMemo } from 'react';

type Props = {
  product: Product;
  isClicked?: boolean;
  className?: string;
};

export const FavouriteButton: React.FC<Props> = ({
  product,
  isClicked = true,
  className,
}) => {
  const { favourites, handleProductAdd, handleProductRemove } = useFavourites();

  const { accessAddToFavourites, accessRemoveFromFavourites } =
    useLanguage().localeTexts;

  const isProductInFavourites = useMemo(
    () =>
      favourites.some(
        productInFavourites => productInFavourites.itemId === product.itemId,
      ),
    [favourites, product.itemId],
  );

  const handleClick = () => {
    if (isClicked) {
      if (isProductInFavourites) {
        handleProductRemove(product.itemId);
      } else {
        handleProductAdd(product);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classNames(
        styles.FavouriteButton,
        isProductInFavourites && styles.FavouriteButton_active,
        className,
      )}
    >
      {isProductInFavourites ? (
        <FullHeartSVG className={styles.Icon} />
      ) : (
        <HeartSVG className={styles.Icon} />
      )}

      <span className={styles.Label}>
        {isProductInFavourites
          ? accessRemoveFromFavourites
          : accessAddToFavourites}
      </span>
    </button>
  );
};
