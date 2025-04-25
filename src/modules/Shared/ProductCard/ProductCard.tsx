import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { useFavouritesButton } from '../../../utils/handleFavouritesButton';
import { useAddToCartButton } from '../../../utils/addToCart';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favourites, handleFavouritesButton } = useFavouritesButton();
  const { cart, handleAddToCartButton } = useAddToCartButton();

  const pageScroll = () => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productCard__header}
        onClick={pageScroll}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.productCard__image}
        />
      </Link>

      <main className={styles.productCard__main}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.productCard__name}
          onClick={pageScroll}
        >
          {product.name}
        </Link>

        <div className={styles.productCard__price}>
          <span className={styles.productCard__priceRegular}>
            {`$${product.price}`}
          </span>
          <span className={styles.productCard__priceDiscount}>
            {`$${product.fullPrice}`}
          </span>
        </div>

        <div className={styles.productCard__divider} />

        <div className={styles.productCard__specs}>
          {[
            { label: 'Screen', value: product.screen },
            { label: 'Capacity', value: product.capacity },
            { label: 'RAM', value: product.ram },
          ].map(({ label, value }) => (
            <div key={label} className={styles.productCard__specsRow}>
              <span className={styles.productCard__specsLabel}>{label}</span>
              <span className={styles.productCard__specsValue}>{value}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.productCard__footer}>
        <button
          onClick={() => handleAddToCartButton(product)}
          className={classNames(styles.productCard__addToCart, {
            [styles['productCard__addToCart--is-active']]: cart.some(
              prod => prod.id === product.id,
            ),
          })}
        >
          {cart.some(prod => prod.id === product.id)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>

        <button
          onClick={() => handleFavouritesButton(product)}
          className={classNames(styles.productCard__addToFavourites, {
            [styles['productCard__addToFavourites--is-active']]:
              favourites.some(fav => fav.id === product.id),
          })}
        />
      </footer>
    </div>
  );
};
