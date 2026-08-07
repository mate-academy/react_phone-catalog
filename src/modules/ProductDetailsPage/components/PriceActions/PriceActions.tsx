// #regionImport
import React from 'react';
import { useTranslation } from 'react-i18next';

import stylesCard from '@shared/ui/ProductCard/ProductCard.module.scss';
import styles from './PriceActions.module.scss';

import { Button } from '@shared/ui/Button';
import { FavouriteButton } from '@shared/ui/FavouriteButton';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import { selectIsFavourite } from '@src/features/favourites/selectors';
import { selectIsCart } from '@src/features/cart/selectors';
import { ProductDetails } from '@src/types/ProductDetails';
import { actions as favouritesActions } from '@src/features/favourites';
import { actions as cartActions } from '@src/features/cart';
// #endregion

type Props = {
  product: ProductDetails;
};

export const PriceActions: React.FC<Props> = ({ product }) => {
  const items = useAppSelector(state => state.products.items);
  const currentProduct = items.find(p => p.itemId === product.id) || null;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isFavourite = useAppSelector(state =>
    selectIsFavourite(state, product.id),
  );
  const isInCart = useAppSelector(state => selectIsCart(state, product.id));

  const handleToggleFavourite = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (currentProduct) {
      dispatch(favouritesActions.toggleItem(currentProduct));
    }
  };

  const handleAddToCart = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (currentProduct) {
      dispatch(cartActions.toggleCartItem(currentProduct));
    }
  };

  return (
    <div>
      <div className={stylesCard.cardPrices}>
        <p className={styles.price}>${product.priceRegular}</p>

        <p className={stylesCard.cardOldPrice}>${product.priceDiscount}</p>
      </div>

      <div className={styles.productButtons}>
        <Button
          className={styles.addBtn}
          onClick={handleAddToCart}
          isActive={isInCart}
        >
          {isInCart ? t('buttons.added') : t('buttons.addToCard')}
        </Button>

        <FavouriteButton
          className={styles.farouriteBtn}
          isActive={isFavourite}
          onClick={handleToggleFavourite}
        />
      </div>
    </div>
  );
};
