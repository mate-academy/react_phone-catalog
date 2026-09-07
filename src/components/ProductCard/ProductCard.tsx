import { useContext, useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CategoriesType } from '../../types/CategoriesType';
import { ProductType } from '../../types/ProductType';
import { AppContext } from '../../context/AppContext';
import { baseUrl } from '../../utils/ts/baseURL';

interface ProductCardProps {
  product: ProductType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { handleFavourites, favourites, handleCart, cart } =
    useContext(AppContext) || {};
  const locationPath = useLocation().pathname;
  const { productId } = useParams();

  const getCategory = (location: string) => {
    const categories: CategoriesType[] = ['phones', 'tablets', 'accessories'];

    return categories.find(category => location.includes(category));
  };

  const handleLink = (): string => {
    const category = getCategory(locationPath);

    if (category && !productId) {
      return product.itemId;
    }

    if (category && productId) {
      return `/${category}/${product.itemId}`;
    }

    return `/product/${product.itemId}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);

    if (handleFavourites) {
      handleFavourites(product);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(!isAddedToCart);

    if (handleCart) {
      handleCart(product);
    }
  };

  useEffect(() => {
    if (
      favourites?.some(favouriteItem => favouriteItem.itemId === product.itemId)
    ) {
      setIsLiked(true);
    }

    if (
      cart?.some(
        favouriteItem => favouriteItem.product.itemId === product.itemId,
      )
    ) {
      setIsAddedToCart(true);
    }
  }, [favourites, cart, product.itemId]);

  return (
    <div className={styles.card}>
      <Link to={handleLink()} className={styles.card__imageContainer}>
        <img
          className={styles.card__image}
          src={`${baseUrl}/${product.image}`}
          alt=""
        />
      </Link>

      <div className={styles.card__titleContainer}>
        <Link to={handleLink()} className={styles.card__title}>
          {product.name}
        </Link>
      </div>

      <div>
        <span className={styles.card__price}>${product.price}</span>
        <span className={styles.card__fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.card__splitter}></div>

      <article className={styles.card__specs}>
        <div className={styles.card__specContainer}>
          <p>Screen</p>

          <p>{product.screen}</p>
        </div>

        <div className={styles.card__specContainer}>
          <p>Capacity</p>

          <p>{product.capacity}</p>
        </div>

        <div className={styles.card__specContainer}>
          <p>RAM</p>

          <p>{product.ram}</p>
        </div>
      </article>

      <div className={styles.card__buttons}>
        <button
          className={classNames(styles.card__addToCart, {
            [styles.card__addedToCart]: isAddedToCart,
          })}
          onClick={handleAddToCart}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={classNames(styles.card__addToFavourite, {
            [styles.card__addedToFavourite]: isLiked,
          })}
          onClick={handleLike}
        ></button>
      </div>
    </div>
  );
};
