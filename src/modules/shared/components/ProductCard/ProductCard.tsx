import styles from './ProductCard.module.scss';
import { Product } from '../../../../types/Product';
import { Button } from '../Button';
import { useCart, useFavorites } from '../../../../contexts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { name, fullPrice, price, screen, capacity, ram, image } = product;
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();

  const isProductInCart = isInCart(product.itemId);
  const isProductFavorite = isFavorite(product.itemId);

  const handleCartClick = () => {
    if (isProductInCart) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product);
  };

  return (
    <article className={styles['product-card']}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ category: product.category }}
        className={styles['product-card__link']}
      >
        <img src={image} alt={name} className={styles['product-card__image']} />
        <h3 className={styles['product-card__title']}>{name}</h3>
      </Link>
      <div className={styles['product-card__price']}>
        <div className={styles['product-card__price-sale']}>${price}</div>
        {fullPrice && (
          <div className={styles['product-card__price-regular']}>
            ${fullPrice}
          </div>
        )}
      </div>
      <div className={styles['product-card__divider']}></div>
      <dl className={styles['product-card__info']}>
        <div className={styles['product-card__info-row']}>
          <dt className={styles['product-card__info-label']}>
            {t('productCard.screen')}
          </dt>
          <dd className={styles['product-card__info-value']}>{screen}</dd>
        </div>
        <div className={styles['product-card__info-row']}>
          <dt className={styles['product-card__info-label']}>
            {t('productCard.capacity')}
          </dt>
          <dd className={styles['product-card__info-value']}>{capacity}</dd>
        </div>
        <div className={styles['product-card__info-row']}>
          <dt className={styles['product-card__info-label']}>
            {t('productCard.ram')}
          </dt>
          <dd className={styles['product-card__info-value']}>{ram}</dd>
        </div>
      </dl>
      <div className={styles['product-card__actions']}>
        <Button selected={isProductInCart} fullWidth onClick={handleCartClick}>
          {isProductInCart ? t('product.inCart') : t('product.addToCart')}
        </Button>

        <Button
          variant="icon"
          iconLeft="like"
          aria-label={
            isProductFavorite
              ? t('productCard.removeFromFavorites')
              : t('productCard.addToFavorites')
          }
          red={isProductFavorite}
          onClick={handleFavoriteClick}
        />
      </div>
    </article>
  );
};
