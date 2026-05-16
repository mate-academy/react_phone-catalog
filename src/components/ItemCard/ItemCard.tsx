import React from 'react';
import styles from './ItemCard.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { TechSpecsRow } from '../TechSpecsRow';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectIsFavorite, toggleFavorites } from '../../features/favorites';
import {
  addToCart,
  removeFromCart,
  selectIsAddedToCart,
} from '../../features/cart';

interface Props {
  item: Product;
  hasDiscount?: boolean;
}

export const ItemCard: React.FC<Props> = ({ item, hasDiscount = true }) => {
  const dispatch = useAppDispatch();

  const isInFavorite = useAppSelector(state =>
    selectIsFavorite(state, item.itemId || ''),
  );

  const isAddedToCart = useAppSelector(state =>
    selectIsAddedToCart(state, item.itemId || ''),
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorites(item));
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch(addToCart(item));
    } else if (isAddedToCart) {
      dispatch(removeFromCart(item.itemId));
    }
  };

  const specsList = [
    { label: 'Screen', value: item.screen },
    { label: 'Capacity', value: item.capacity },
    { label: 'RAM', value: item.ram },
  ];

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemCard__top}>
        <Link
          to={`/${item.category}/${item.itemId}`}
          className={styles.itemCard__link}
        >
          <div className={styles.itemCard__photo}>
            <img src={item.image} alt={item.name} />
          </div>
        </Link>
        <Link
          to={`/${item.category}/${item.itemId}`}
          className={styles.itemCard__link}
        >
          <h2 className={styles.itemCard__title}>{item.name}</h2>
        </Link>
      </div>
      <div className={styles.itemCard__bottom}>
        <div className={styles.itemCard__price}>
          <h2 className={styles.itemCard__price__discount}>
            {hasDiscount ? `$${item.price}` : `$${item.fullPrice}`}
          </h2>
          {hasDiscount && (
            <h2 className={styles.itemCard__price__regular}>
              {`$${item.fullPrice}`}
            </h2>
          )}
        </div>

        <div className={styles.itemCard__specifications}>
          {specsList.map(spec => (
            <TechSpecsRow
              key={spec.label}
              label={spec.label}
              value={spec.value}
            />
          ))}
        </div>

        <div className={styles.itemCard__buttons}>
          <button
            className={classNames(styles.itemCard__buttons__addToCart, {
              [styles['itemCard__buttons__addToCart--active']]: isAddedToCart,
            })}
            onClick={handleAddToCart}
          >
            {isAddedToCart ? 'Added to Cart' : 'Add to cart'}
          </button>
          <button
            className={classNames(styles.itemCard__buttons__addToFavorites, {
              [styles['itemCard__buttons__addToFavorites--active']]:
                isInFavorite,
            })}
            onClick={handleToggleFavorite}
          ></button>
        </div>
      </div>
    </div>
  );
};
