import styles from './ProductCard.module.scss';
import { Item } from '../../types/Item';
import { Link, Navigate } from 'react-router-dom';
import { ProductControls } from '../ProductControls/ProductControls';
import { useTheme } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

type Props = {
  product: Item;
  isYouMayLike: boolean;
  isWideCard: boolean;
  isWithoutDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isYouMayLike,
  isWideCard,
  isWithoutDiscount,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleClick = () => {
    Navigate(`/${product.category}/${product.id}`, { replace: false });

    if (isYouMayLike) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`${styles.productCard} ${theme === 'light' && styles['productCard--lightTheme']} ${isYouMayLike && styles['productCard--youMayLike']} ${isWideCard && styles['productCard--wide']}`}
    >
      <div className={styles.productCard__head}>
        <Link
          to={`/${product.category}/${product.id}`}
          className={styles.productCard__photoLink}
          onClick={handleClick}
        >
          <img
            src={product.images[0]}
            alt="Product photo"
            className={`${styles.productCard__photo} ${isYouMayLike && styles['productCard__photo--youMayLike']}`}
          />
        </Link>

        <Link
          to={`/${product.category}/${product.id}`}
          className={`${styles.productCard__title} ${theme === 'light' && styles['productCard__title--lightTheme']}`}
          onClick={handleClick}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.productCard__price}>
        <p className={styles.productCard__discount}>${product.priceDiscount}</p>

        {!isWithoutDiscount && (
          <p className={styles.productCard__fullPrice}>${product.priceRegular}</p>
        )}
      </div>

      <div className={styles.productCard__description}>
        <div className={styles.productCard__descriptionItem}>
          <span className={styles.productCard__descriptionTitle}>{t('titles.screen')}</span>
          <span className={styles.productCard__descriptionValue}>{product.screen}</span>
        </div>

        <div className={styles.productCard__descriptionItem}>
          <span className={styles.productCard__descriptionTitle}>{t('titles.capacity')}</span>
          <span className={styles.productCard__descriptionValue}>{product.capacity}</span>
        </div>

        <div className={styles.productCard__descriptionItem}>
          <span className={styles.productCard__descriptionTitle}>{t('titles.ram')}</span>
          <span className={styles.productCard__descriptionValue}>{product.ram}</span>
        </div>
      </div>

      <ProductControls
        product={product}
        isDetails={false}
        isYouMayLike={isYouMayLike}
        isWideCard={isWideCard}
      />
    </div>
  );
};
