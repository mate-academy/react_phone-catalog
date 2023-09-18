import {
  FC,
  useEffect,
  useState,
} from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { FavouritesIcon } from '../../assets/icons/favourites-icon';
import { Product } from '../../types/Product';
import {
  addToCart,
  getCart,
  removeFromCart,
} from '../../helpers/Cart';
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from '../../helpers/Favourites';
import { FavouritesLiked } from '../../assets/icons/favourites-icon-liked';
import { useCartContext } from '../../context/cartContext';
import { useFavsContext } from '../../context/favouritesContext';

export type Props = {
  product: Product;
  updateFavourites?: () => void;
};

export const ProductCard: FC<Props> = ({ product, updateFavourites }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { setAddedToCart } = useCartContext();
  const { setAddedToFavs } = useFavsContext();

  const parentPath = useResolvedPath('../').pathname;

  const updateIsAddedState = () => {
    const updatedCart = getCart();
    const updatedIsAdded = updatedCart
      .some(item => item.product.id === product.id);

    setIsAdded(updatedIsAdded);

    if (updatedIsAdded) {
      localStorage.setItem(`isAdded_${product.id}`, 'true');
    } else {
      localStorage.removeItem(`isAdded_${product.id}`);
    }
  };

  const updateIsAddedToFavs = () => {
    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs
      .some(item => item.id === product.id);

    setIsAddedToFav(updatedIsAddedToFavs);

    if (updatedIsAddedToFavs) {
      localStorage.setItem(`isAddedToFavs_${product.id}`, 'true');
    } else {
      localStorage.removeItem(`isAddedToFavs_${product.id}`);
    }
  };

  useEffect(() => {
    updateIsAddedState();
    updateIsAddedToFavs();
  }, [product.id]);

  useEffect(() => {
    const storedIsAdded = localStorage.getItem(`isAdded_${product.id}`);
    const isAddedToFavs = localStorage.getItem(`isAddedToFavs_${product.id}`);

    if (storedIsAdded) {
      setIsAdded(storedIsAdded === 'true');
    }

    if (isAddedToFavs) {
      setIsAddedToFav(isAddedToFavs === 'true');
    }
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const productToAdd = {
      product,
      quantity: 1,
    };

    if (isAdded) {
      removeFromCart(productToAdd);
      setAddedToCart(prev => prev - 1);
    } else {
      addToCart(productToAdd);
      setAddedToCart(prev => prev + 1);
    }

    const updatedCart = getCart();
    const updatedIsAdded = updatedCart
      .some(item => item.product.id === product.id);

    setIsAdded(updatedIsAdded);
    updateIsAddedState();
  };

  const handleAddToFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAddedToFav) {
      removeFromFavourites(product);
      setAddedToFavs(prev => prev - 1);
    } else {
      addToFavourites(product);
      setAddedToFavs(prev => prev + 1);
    }

    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs
      .some(item => item.id === product.id);

    setIsAddedToFav(updatedIsAddedToFavs);
    updateIsAddedToFavs();

    if (updateFavourites) {
      updateFavourites();
    }
  };

  return (
    <div className={styles.card}>
      <Link
        to={{
          pathname: parentPath + product.itemId,
        }}
        className={styles.card__link}
      >
        <div className={styles.image__container}>
          <img
            className={styles.image}
            src={`new/${product.image}`}
            alt={product.name}
          />
        </div>

        <div className={styles.card__content}>
          <h1 className={styles.title}>
            {product.name}
            <br />
            (iMT9G2FS/A)
          </h1>
          <div className={styles.price__container}>
            <h1 className={styles.price}>
              {`$${product.fullPrice}`}
            </h1>
            <h1 className={styles.discount}>
              {`$${product.price}`}
            </h1>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.info__item}>
            <h2 className={styles.info__key}>Screen</h2>
            <h3 className={styles.info__value}>{product.screen}</h3>
          </div>

          <div className={styles.info__item}>
            <h2 className={styles.info__key}>Capacity</h2>
            <h3 className={styles.info__value}>{product.capacity}</h3>
          </div>

          <div className={styles.info__item}>
            <h2 className={styles.info__key}>
              RAM
            </h2>
            <h3 className={styles.info__value}>{product.ram}</h3>
          </div>
        </div>
      </Link>

      <div className={styles.button}>
        {isAdded
          ? (
            <button
              className={styles.button__cart_active}
              onClick={handleAddToCart}
              type="submit"
            >
              Added to cart
            </button>
          ) : (
            <button
              className={styles.button__cart}
              onClick={handleAddToCart}
              type="submit"
            >
              Add to cart
            </button>
          )}

        {isAddedToFav
          ? (
            <button
              data-cy="addToFavorite"
              className={styles.button__favourites}
              onClick={handleAddToFavourites}
              type="button"
            >
              <FavouritesLiked />
            </button>
          ) : (
            <button
              data-cy="addToFavorite"
              className={styles.button__favourites}
              onClick={handleAddToFavourites}
              type="button"
            >
              <FavouritesIcon />
            </button>
          )}
      </div>
    </div>
  );
};
