import { AllProducts } from '../../types/AllProduct/AllProduct';
import styles from './ProductCard.module.scss';

import FvoriteIcon from '../../../assets/icons/favorites-icons/favorite-icon.svg';
import FvoriteIconAdded from '../../../assets/icons/favorites-icons/favorite-icon-added.svg';

import { useContext } from 'react';

import {
  FavoritesStateContext,
  FavoritesDispatchContext,
} from '../../store/FavoritesProvider';
import {
  CartDispatchContext,
  CartStateContext,
} from '../../store/CartProvider';
import { Link } from 'react-router-dom';

type Props = {
  product: AllProducts;
  isHotPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isHotPrice }) => {
  const favoritesProduct = useContext(FavoritesStateContext);
  const favoritesDispatch = useContext(FavoritesDispatchContext);

  const cartProduct = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);

  const handleFavorites = (value: AllProducts) => {
    const isFavorite = favoritesProduct.some(
      favorite => favorite.id === value.id,
    );

    if (isFavorite) {
      favoritesDispatch({ type: 'deleteFavoritesProduct', payload: value.id });
    } else {
      favoritesDispatch({ type: 'addFavoritesProduct', payload: value });
    }
  };

  const handleCart = (value: AllProducts) => {
    const newCartProduct = {
      id: value.id,
      quantity: 1,
      product: value,
    };

    cartDispatch({ type: 'addCartProduct', payload: newCartProduct });
  };

  const isFavorite = (id: number) => {
    return favoritesProduct.some(favorite => favorite.id === id);
  };

  const isCart = (id: number) => {
    return cartProduct.some(cart => cart.id === id);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          src={`${product.image}`}
          alt="Зображення продукту"
          className={styles.productCard__mainImage}
        />
      </Link>
      <p className={styles.productCard__description}>{product.name}</p>

      {isHotPrice ? (
        <div className={styles.productCard__priceContainer}>
          <h3 className={styles.productCard__price}>{`$${product.price}`}</h3>
          <h3
            className={styles.productCard__fullPrice}
          >{`$${product.fullPrice}`}</h3>
        </div>
      ) : (
        <h3 className={styles.productCard__price}>{`$${product.fullPrice}`}</h3>
      )}
      <span className={styles.productCard__line}></span>
      <div className={styles.productCard__featureWrapper}>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Screen</p>
          <p className={styles.productCard__featureValue}>{product.screen}</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Capacity</p>
          <p className={styles.productCard__featureValue}>{product.capacity}</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>RAM</p>
          <p className={styles.productCard__featureValue}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.productCard__buttons}>
        <button
          className={styles.productCard__addToCart}
          disabled={isCart(product.id)}
          onClick={() => handleCart(product)}
        >
          Add to cart
        </button>
        <button
          className={styles.productCard__addToFavorites}
          onClick={() => handleFavorites(product)}
        >
          <img
            src={isFavorite(product.id) ? FvoriteIconAdded : FvoriteIcon}
            alt="Іконка для додавання в улюбленні"
          />
        </button>
      </div>
    </div>
  );
};
