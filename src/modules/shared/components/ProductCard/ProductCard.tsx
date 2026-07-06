// #region imports
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { FavButton } from '../FavButton';
import { Product } from '../../types/Product';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';
import baseStyles from './base.module.scss';
import styles from './ProductCard.module.scss';
// #endregion

type Props = {
  product: Product;
  withFullPrices?: boolean;
};

interface Characteristic {
  key: keyof Product;
  label: string;
}

export const ProductCard: React.FC<Props> = ({
  product,
  withFullPrices = false,
}) => {
  const { t } = useTranslation('productCard');
  const { itemId, image, name, price, fullPrice } = product;

  const { isFavourite, toggleFavorites } = useFavorites(itemId, product);
  const { isInCart, toggleCart } = useCart(itemId, product);

  const characteristics: Characteristic[] = useMemo(
    () => [
      { key: 'screen', label: t('screen') },
      { key: 'capacity', label: t('capacity') },
      { key: 'ram', label: t('RAM') },
    ],
    [t],
  );

  return (
    <div className={`${baseStyles.card} ${styles.card}`}>
      <Link to={`/product/${itemId}`} className={styles.productLink}>
        <div className={baseStyles.photoLink}>
          <img
            src={image}
            alt={name}
            className={`${baseStyles.image} ${styles.image}`}
          />
        </div>

        <div className={styles.name}>{name}</div>
      </Link>

      <div className={baseStyles.prices}>
        <span className={styles.currentPrice}>{`$${price}`}</span>

        {withFullPrices && price !== fullPrice && (
          <span className={styles.oldPrice}>{`$${fullPrice}`}</span>
        )}
      </div>

      <hr className={baseStyles.divider} aria-hidden="true" />

      <ul className={baseStyles.characteristics}>
        {characteristics.map(({ key, label }) => (
          <li
            className={`${baseStyles.characteristic} ${styles.characteristic}`}
            key={key}
          >
            <span className={styles.characteristicName}>{label}</span>

            <span>{product[key]}</span>
          </li>
        ))}
      </ul>

      <div className={baseStyles.actions}>
        <Button
          name={isInCart ? t('removeFromCart') : t('addToCart')}
          isSelected={isInCart}
          onClick={toggleCart}
        />

        <FavButton isSelected={isFavourite} onClick={toggleFavorites} />
      </div>
    </div>
  );
};
