import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '@shared/types';
import { useCart, useFavourites, useTranslation } from '@shared/context';
import { favouritesFilledIcon, favouritesIcon } from '@shared/assets/icons';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;

  const { t } = useTranslation();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, addToCart, removeFromCart } = useCart();
  const isAddedToFavourites = isFavourite(itemId);
  const isAddedToCart = isInCart(itemId);

  const specs = [
    { title: t('specs.screen'), value: screen },
    { title: t('specs.capacity'), value: capacity },
    { title: t('specs.ram'), value: ram },
  ];

  return (
    <article className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.photoLink}>
        <img src={image} alt={name} className={styles.photo} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <p className={styles.price}>
        <span className={styles.currentPrice}>{`$${price}`}</span>

        {showDiscount && fullPrice > price && (
          <span className={styles.fullPrice}>{`$${fullPrice}`}</span>
        )}
      </p>

      <span className={styles.divider} />

      <ul className={styles.specs}>
        {specs.map(({ title, value }) => (
          <li key={title} className={styles.spec}>
            <span className={styles.specTitle}>{title}</span>
            <span className={styles.specValue}>{value}</span>
          </li>
        ))}
      </ul>

      <div className={styles.buttons}>
        <button
          type="button"
          className={cn(styles.addToCart, {
            [styles.addToCartActive]: isAddedToCart,
          })}
          aria-pressed={isAddedToCart}
          onClick={() =>
            isAddedToCart ? removeFromCart(itemId) : addToCart(product)
          }
        >
          {isAddedToCart ? t('common.addedToCart') : t('common.addToCart')}
        </button>

        <button
          type="button"
          className={styles.favourite}
          aria-label={
            isAddedToFavourites
              ? t('common.removeFromFavourites')
              : t('common.addToFavourites')
          }
          aria-pressed={isAddedToFavourites}
          onClick={() => toggleFavourite(itemId)}
        >
          <img
            src={isAddedToFavourites ? favouritesFilledIcon : favouritesIcon}
            alt=""
            className={cn({ icon: !isAddedToFavourites })}
          />
        </button>
      </div>
    </article>
  );
};
