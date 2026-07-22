import React from 'react';
import stylesCard from '@shared/ui/ProductCard/ProductCard.module.scss';
import styles from './PriceActions.module.scss';
import { Button } from '@shared/ui/Button';
import { FavouriteButton } from '@shared/ui/FavouriteButton';
import { useTranslation } from 'react-i18next';

type Props = {
  priceRegular: number;
  priceDiscount: number;
  isInCart: boolean;
  isFavourite: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
  onToggleFavourite: (e: React.MouseEvent) => void;
};

export const PriveActions: React.FC<Props> = ({
  priceRegular,
  priceDiscount,
  isInCart,
  isFavourite,
  onAddToCart,
  onToggleFavourite,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={stylesCard.cardPrices}>
        <p className={styles.price}>${priceRegular}</p>

        <p className={stylesCard.cardOldPrice}>${priceDiscount}</p>
      </div>

      <div className={styles.productButtons}>
        <Button
          className={styles.addBtn}
          onClick={onAddToCart}
          disabled={isInCart}
          isActive={isInCart}
        >
          {isInCart ? t('buttons.added') : t('buttons.addToCard')}
        </Button>

        <FavouriteButton
          className={styles.farouriteBtn}
          isActive={isFavourite}
          onClick={onToggleFavourite}
        />
      </div>
    </div>
  );
};
