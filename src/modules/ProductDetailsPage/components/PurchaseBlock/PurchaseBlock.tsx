//#region imports
import { FC } from 'react';
import { Button } from '../../../shared/components/Button';
import { Product } from '../../../shared/types/Product';
import { FavButton } from '../../../shared/components/FavButton';
import { useFavorites } from '../../../shared/hooks/useFavorites';
import { useCart } from '../../../shared/hooks/useCart';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
import styles from './PurchaseBlock.module.scss';
//#endregion

type Props = {
  product: Product;
  price: number;
  fullPrice: number;
};

export const PurchaseBlock: FC<Props> = ({ product, price, fullPrice }) => {
  const { t } = useTranslation('productDetails');

  const { isInCart, addToCart } = useCart(product.itemId, product);
  const { isFavourite, toggleFavorites } = useFavorites(
    product.itemId,
    product,
  );

  return (
    <div className={baseStyles.purchaseBlock}>
      <div className={baseStyles.priceBox}>
        <span className={styles.currentPrice}>{`$${price}`}</span>

        <span className={styles.fullPrice}>{`$${fullPrice}`}</span>
      </div>

      <div className={baseStyles.buttons}>
        <Button
          name={t('addToCart')}
          isSelected={isInCart}
          selectedName={t('added')}
          size="medium"
          onClick={addToCart}
        />

        <FavButton
          isSelected={isFavourite}
          size="medium"
          onClick={toggleFavorites}
        />
      </div>
    </div>
  );
};
