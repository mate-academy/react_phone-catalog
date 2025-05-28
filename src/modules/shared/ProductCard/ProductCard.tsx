import styles from './ProductCard.module.scss';
import IconHeart from '../../../img/icons/icon-heart.png';
import IconHeartRed from '../../../img/icons/icon-heart-red.png';
import { Product } from '../../../types/Product';
import { useContext, useMemo } from 'react';
import { GlobalContext } from '../../../app/store/GlobalContext';
import { makeGapBetween } from '../../../utils/format';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { itemId, name, capacity, price, image, screen, ram, category } =
    product;

  const {
    cart,
    toggleCartItem,
    favorites,
    toggleFavoritesItem,
    setSelectedProduct,
  } = useContext(GlobalContext);

  const isInCart = useMemo(() => {
    return cart.some(p => p.itemId === itemId);
  }, [cart, itemId]);

  const isInFavorites = useMemo(() => {
    return favorites.some(p => p.itemId === itemId);
  }, [favorites, itemId]);

  return (
    <section className={styles.productCard}>
      <Link
        to={`/${category}/${product.itemId}`}
        className={styles.productCard__image}
        onClick={() => {
          setSelectedProduct(product);
        }}
      >
        <img src={image} alt={name} />
      </Link>
      <div className={styles.productCard__info}>
        <div className={styles.productCard__namePrice}>
          <h3 className={styles.productCard__title}>{name}</h3>
          <p className={styles.productCard__price}>${price}</p>
        </div>
        <div className={styles.productCard__features}>
          <p className={styles.productCard__screen}>
            <span className={styles.productCard__property}>Screen:</span>
            <span className={styles.productCard__value}>{screen}</span>
          </p>
          <p className={styles.productCard__capacity}>
            <span className={styles.productCard__property}>Capacity:</span>
            <span className={styles.productCard__value}>
              {makeGapBetween(capacity)}
            </span>
          </p>
          <p className={styles.productCard__ram}>
            <span className={styles.productCard__property}>ram:</span>
            <span className={styles.productCard__value}>
              {makeGapBetween(ram)}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button
          className={styles.productCard__button_addToCart}
          onClick={() => toggleCartItem(product)}
          style={{
            backgroundColor: isInCart ? '#323542' : '#905bff',
          }}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={styles.productCard__button_favorites}
          onClick={() => toggleFavoritesItem(product)}
        >
          {isInFavorites ? (
            <img src={IconHeartRed} alt="Icon-heart" />
          ) : (
            <img src={IconHeart} alt="Icon-heart" />
          )}
        </button>
      </div>
    </section>
  );
};
