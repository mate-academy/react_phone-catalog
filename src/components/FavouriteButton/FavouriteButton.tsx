import styles from './FavouriteButton.module.scss';

import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';

import {
  useUserActions,
  useUserActionsDispatch,
} from '../../context/useUserActions';
import { useProducts } from '../../context/useProducts';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

import favouriteIcon from '../../images/icons/favourites.svg';
import favouriteAddedIcon from '../../images/icons/favourites-added.svg';

type Props = {
  productData: Product | ProductDetails;
};

export const FavouriteButton: React.FC<Props> = ({ productData }) => {
  const { products } = useProducts();
  const { favourites } = useUserActions();
  const dispatch = useUserActionsDispatch();

  const correspondingShortProduct = useMemo(() => {
    if ('namespaceId' in productData) {
      return products.find(p => p.itemId === productData.id);
    }

    return productData;
  }, [products, productData]);

  const isFavourite = useMemo(() => {
    if (!correspondingShortProduct) {
      return false;
    }

    return favourites.some(
      favItem => favItem.id === correspondingShortProduct.id,
    );
  }, [favourites, correspondingShortProduct]);

  const handleToggleFavourite = useCallback(() => {
    if (correspondingShortProduct) {
      dispatch({
        type: 'TOGGLE_FAVOURITE',
        payload: correspondingShortProduct,
      });
    }
  }, [dispatch, correspondingShortProduct]);

  return (
    <button
      className={styles.buttonFavourites}
      onClick={handleToggleFavourite}
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
    >
      <span className={styles.buttonFavourites__icoWrapper}>
        <img
          src={favouriteIcon}
          alt="Add to favourites"
          className={classNames(styles.buttonFavourites__icon, {
            [styles['buttonFavourites__icon--visible']]: !isFavourite,
          })}
        />
        <img
          src={favouriteAddedIcon}
          alt="Remove from favourites"
          className={classNames(styles.buttonFavourites__icon, {
            [styles['buttonFavourites__icon--visible']]: isFavourite,
          })}
        />
      </span>
    </button>
  );
};
