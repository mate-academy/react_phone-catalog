import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../UI/Buttons/Button';
import { ROUTES } from '../../../constants/ROUTES';
import { useProductStore } from '../../../store/store';
import Product from '../../../types/Product';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
  isBrandNew?: boolean;
}

const ProductCard: FC<Props> = ({ product, isBrandNew = false }) => {
  const {
    images,
    name,
    priceDiscount,
    priceRegular,
    screen,
    capacity,
    ram,
    id,
  } = product;

  const addToCart = useProductStore(state => state.toggleProductInCart);
  const toggleFavorite = useProductStore(state => state.toggleFavorite);

  const cart = useProductStore(state => state.cartItems);
  const favorites = useProductStore(state => state.favorites);

  const isInCart = cart.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <article className={styles.wrapper}>
      <div className={styles.header}>
        <Link
          to={ROUTES.PRODUCT_DETAIL.replace(':productId', id)}
          className={styles.imgWrapper}
        >
          <img src={images[0]} alt={name} className={styles.image} />
        </Link>
        <Link
          to={ROUTES.PRODUCT_DETAIL.replace(':productId', id)}
          className={styles.descr}
        >
          {name}
        </Link>
        <p className={styles.prices}>
          <span className={styles.newPrice}>${priceDiscount}</span>
          {!isBrandNew && (
            <span className={styles.oldPrice}>${priceRegular}</span>
          )}
        </p>
      </div>

      <ul className={styles.paramsList}>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Screen</span>
          <span className={styles.paramValue}>{screen}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Capacity</span>
          <span className={styles.paramValue}>{capacity}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>RAM</span>
          <span className={styles.paramValue}>{ram}</span>
        </li>
      </ul>

      <div className={styles.actionsWrapper}>
        <Button
          onClick={() => addToCart(product)}
          variant="primary"
          isSelected={isInCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>
        <Button
          onClick={() => toggleFavorite(product)}
          variant="icon"
          size="40px"
        >
          {isFavorite ? (
            <img src="img/icons/favorite-fill-icon.svg" alt="" />
          ) : (
            <img src="img/icons/favorite-icon.svg" alt="" />
          )}
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
