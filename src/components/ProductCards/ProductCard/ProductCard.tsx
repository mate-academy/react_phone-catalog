import { Link, useLocation } from 'react-router-dom';

import { Product } from '../../../types/Product';
import { extractNumberAndSuffix } from '../../../utils';

import { favoriteIcon } from '../../../assets';
import isFavoriteIcon from '../../../assets/images/is-favorite.svg';

import cn from 'classnames';

import { Button } from '../../../ui/Button/Button';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { addProduct, deleteProduct } from '../../../store/slices/cartSlice';
import {
  addToFavorites,
  removeProduct,
} from '../../../store/slices/favoritesSlice';
import { PriceInfo } from './PriceInfo';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  isHotPrice: boolean;
};

export const ProductCard: React.FC<Props> = props => {
  const { pathname } = useLocation();
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const dispatch = useAppDispatch();

  const isHaveProduct = cart.some(item => item.id === props.product.id);
  const isFavoriteProduct = favorites.some(
    item => item.id === props.product.id,
  );

  const { name, screen, capacity, ram, image, price, fullPrice, itemId } =
    props.product;
  const { isHotPrice } = props;

  const normalizeCapacity = extractNumberAndSuffix(capacity);
  const normalizeRam = extractNumberAndSuffix(ram);

  const handleAddProduct = () => {
    if (!isHaveProduct) {
      dispatch(addProduct(props.product));
    } else {
      dispatch(deleteProduct(props.product.id));
    }
  };

  const handleToggleFavoriteStatus = () => {
    if (!isFavoriteProduct) {
      dispatch(addToFavorites(props.product));
    } else {
      dispatch(removeProduct(props.product.id));
    }
  };

  return (
    <div className={styles.card}>
      <Link
        className={styles.link}
        to={`/product/${itemId}`}
        state={{ prevPath: pathname }}
      >
        <img className={styles.picture} src={image} alt="product" />
        <p className={styles.title}>{name}</p>
      </Link>

      <PriceInfo
        fontSize="22px"
        isHotPrice={isHotPrice}
        price={price}
        fullPrice={fullPrice}
      />

      <div className={styles.inner}>
        <div className={styles.descriptions}>
          <p className={styles.description}>Screen</p>
          <p className={styles.description}>Capacity</p>
          <p className={styles.description}>RAM</p>
        </div>
        <div className={styles.descriptions}>
          <p className={cn(styles.description, styles['description--active'])}>
            {screen}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {normalizeCapacity}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {normalizeRam}
          </p>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button
          className={isHaveProduct ? 'active' : ''}
          appearance="primary"
          onClick={handleAddProduct}
        >
          {isHaveProduct ? 'Added to cart' : 'Add to cart'}
        </Button>

        <Button
          className={isFavoriteProduct ? 'active' : ''}
          appearance="dark"
          onClick={handleToggleFavoriteStatus}
        >
          <img
            src={isFavoriteProduct ? isFavoriteIcon : favoriteIcon}
            alt="favorite"
          />
        </Button>
      </div>
    </div>
  );
};
