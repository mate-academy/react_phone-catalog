import React from 'react';
import styles from './Product.module.scss';
import { ProductType } from '../../types/ProductType';
import { Link } from 'react-router-dom';
import ProductInfo from './ProductInfo';
import { Actions } from '../Actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../services/favorites';
import { RootState } from '../../store/type';
import { addProduct } from '../../services/cart';

type Props = {
  product: ProductType;
  fullPriceActive: boolean;
};

export const Product: React.FC<Props> = ({ product, fullPriceActive }) => {
  const {
    name,
    price,
    fullPrice,
    image,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  const dispatch = useDispatch();
  const favorites: string[] = useSelector(
    (state: RootState) => state.favorites,
  );

  const cart: { id: string; quantity: number }[] = useSelector(
    (state: RootState) => state.cart,
  );

  const isFavorite = favorites.includes(itemId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(itemId));
    } else {
      dispatch(addFavorite(itemId));
    }
  };

  const isInCart = cart.some(item => item.id === itemId);

  const toggleCart = () => {
    if (!isInCart) {
      dispatch(addProduct(itemId));
    }
  };

  return (
    <article className={styles.product}>
      <Link to={`/${category}/${itemId}`} className={styles.product__link}>
        <div className={styles.product__content}>
          <div className={styles.product__imgWrapper}>
            <img className={styles.product__img} src={image} alt={name} />
          </div>

          <h3 className={styles.product__title}>{name}</h3>

          <div className={styles.product__prices}>
            <span className={styles.product__price}>{`$${price}`}</span>

            {fullPriceActive && (
              <span
                className={styles.product__fullPrice}
              >{`$${fullPrice}`}</span>
            )}
          </div>

          <div className={styles.product__line} />

          <ProductInfo
            info={[
              { title: 'Screen', value: screen },
              { title: 'Capacity', value: capacity },
              { title: 'RAM', value: ram },
            ]}
          />

          <Actions
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            toggleCart={toggleCart}
            isInCart={isInCart}
          />
        </div>
      </Link>
    </article>
  );
};
