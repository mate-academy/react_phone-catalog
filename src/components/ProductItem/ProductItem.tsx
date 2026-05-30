import React, { useEffect, useState } from 'react';
import styles from './ProductItem.module.scss';
import { Product } from '../../types/products';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { storage, StorageKey } from '../../app/localStorage';
import HeartIco from '../Icons/Heart/Heart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleCartItem } from '../../features/cartSlice';
import { toggleFavourite } from '../../features/favouritesSlice';
import { CartType } from '../../types/cart';

type Props = {
  product: Product;
  className?: string;
};

const checkItem = (key: StorageKey, id: string): boolean => {
  if (key === 'cart') {
    return (
      storage.getAllItems<CartType>(key)?.some(el => el.id === id) || false
    );
  }

  return storage.getAllItems<string>(key)?.includes(id) || false;
};

const ProductItem: React.FC<Props> = ({ product, className = '' }) => {
  const {
    id,
    itemId,
    category,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;
  const fullName = `${name} (MQ${id.toString().padStart(3, '0')})`;
  const navigate = useNavigate();
  const favourites = useAppSelector(state => state.favourite);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const [isFavourite, setIsFavourite] = useState(
    checkItem('favourites', itemId),
  );
  const [isInCart, setIsInCart] = useState(checkItem('cart', itemId));

  useEffect(() => {
    setIsFavourite(checkItem('favourites', itemId));
  }, [favourites, itemId]);

  useEffect(() => {
    setIsInCart(checkItem('cart', itemId));
  }, [cart, itemId]);

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleCartItem(itemId));
  };

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavourite(itemId));
  };

  const handleCartClick = () => {
    navigate(`/${category}/${itemId}`);
  };

  return (
    <article
      className={classNames(styles.card, className)}
      onClick={handleCartClick}
    >
      <img src={image} alt="iphone" className={styles.card__img} />
      <p className={styles.card__title}>{fullName}</p>
      <p className={styles.card__price}>
        {`$${price} `}
        {fullPrice !== price && (
          <span className={styles.card__price_action}> ${fullPrice}</span>
        )}
      </p>
      <hr className={styles.card__hr} />
      <ul className={styles.propertys}>
        <li className={styles.propertys__item}>
          <p className={styles.propertys__title}>Screen</p>
          <p className={styles.propertys__value}>{screen}</p>
        </li>

        <li className={styles.propertys__item}>
          <p className={styles.propertys__title}>Capacity</p>
          <p className={styles.propertys__value}>{capacity}</p>
        </li>

        <li className={styles.propertys__item}>
          <p className={styles.propertys__title}>RAM</p>
          <p className={styles.propertys__value}>{ram}</p>
        </li>
      </ul>

      <div className={styles.card__buttons}>
        <button
          className={classNames(styles.card__addBtn, {
            [styles.card__addBtn_active]: isInCart,
          })}
          onClick={handleAddToCartClick}
        >
          {isInCart ? `Remove` : `Add to cart`}
        </button>
        <button
          className={styles.card__favouriteBtn}
          onClick={handleFavouriteClick}
        >
          <HeartIco active={isFavourite} />
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
