import { Link } from 'react-router-dom';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import { CatalogProducts } from '../../types/ProductTypes';
import { FavouriteIconSelected } from '../ui/FavouriteIconSelected';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';

interface ProductCardProps {
  product: CatalogProducts;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const handleFavouriteClick = () => {
    toggleFavourite(product);
  };

  const isActiveFavourite = isFavourite(product.id);

  const {
    id,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
    category,
    itemId,
  } = product;

  const isAdded = isInCart(id);

  const handleCartClick = () => {
    if (!isAdded) {
      addToCart(product);
    }
  };

  const productLink = `/${category}/${itemId}`;

  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Capacity', value: capacity },
    { name: 'RAM', value: ram },
  ];

  return (
    <article className={styles.productCard}>
      <Link to={productLink} className={styles.productCard__imageLink}>
        <img
          src={`/${image}`}
          alt={name}
          className={styles.productCard__image}
        />
      </Link>
      <h3 className={styles.productCard__title}>
        <Link to={productLink} className={styles.productCard__titleLink}>
          {name}
        </Link>
      </h3>
      <div className={styles.productCard__priceContainer}>
        <span className={styles.productCard__price}>${price}</span>
        {fullPrice !== price && (
          <span className={styles.productCard__fullPrice}>${fullPrice}</span>
        )}
      </div>
      <hr className={styles.productCard__divider} />
      <div className={styles.productCard__specsContainer}>
        {specs.map(spec => (
          <div key={spec.name} className={styles.productCard__specs}>
            <span className={styles.productCard__specsName}>{spec.name}</span>
            <span className={styles.productCard__specsValue}>{spec.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.productCard__actions}>
        <button
          type="button"
          className={classNames(styles.productCard__actionAddButton, {
            [styles['productCard__actionAddButton--active']]: isAdded,
          })}
          onClick={handleCartClick}
          disabled={isAdded}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={styles.productCard__actionFavouriteIcon}
          onClick={handleFavouriteClick}
          aria-label={
            isActiveFavourite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          {!isActiveFavourite ? (
            <FavouriteIcon className={styles.productCard__icon} />
          ) : (
            <FavouriteIconSelected className={styles.productCard__icon} />
          )}
        </button>
      </div>
    </article>
  );
};
