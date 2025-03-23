import styles from './ProductCard.module.scss';
import { ProductType } from '../../types/ProductType';
import { Icon } from '../Icon/Icon';
import { IconType } from '../../types/IconType';
import { useCart } from '../../../../store/CartContext';
import { useFavorites } from '../../../../store/FavoriteContext';
import { Link } from 'react-router-dom';

type Props = {
  product: ProductType;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { handleFavoriteClick, isInFavorite } = useFavorites();

  return (
    <div className={styles.pc__product_card}>
      <div className={styles.pc__image_container}>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img
            className={styles.pc__image}
            src={`/${product.image}`}
            alt={product.name}
          />
        </Link>
      </div>
      <div className={styles.pc__name}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.pc__link}
        >
          {product.name}
        </Link>
      </div>
      <div className={styles.pc__price}>
        {`$${product.price}`}{' '}
        <span
          className={`${styles.pc__price} ${styles['pc__price--full']}`}
        >{`$${product.fullPrice}`}</span>
      </div>
      <div className={styles.pc__divider}></div>
      <div className={styles.pc__screen}>
        <span className={styles.pc__screen}>Screen</span>
        <span>{product.screen}</span>
      </div>
      <div className={styles.pc__capacity}>
        <span>Capacity</span>
        <span>{product.capacity}</span>
      </div>
      <div className={styles.pc__ram}>
        <span>RAM</span>
        <span>{product.ram}</span>
      </div>
      <div className={styles.pc__bottom_container}>
        <button
          className={styles.pc__button}
          onClick={() => !isInCart(product.id) && addToCart(product)}
          disabled={isInCart(product.id)}
        >
          {isInCart(product.id) ? 'Added to cart' : 'Add to cart'}
        </button>
        <div
          className={styles.pc__icon}
          onClick={() => handleFavoriteClick(product)}
        >
          {isInFavorite(product.id) ? (
            <Icon iconType={IconType.Selected} address="#" />
          ) : (
            <Icon iconType={IconType.Like} address="#" />
          )}
        </div>
      </div>
    </div>
  );
};
