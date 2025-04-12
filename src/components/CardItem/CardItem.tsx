import React, { useState } from 'react';
import styles from './CardItem.module.scss';
import { Product } from '../../types/products';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../app/localStorage';
import HeartIco from '../Icons/Heart/Heart';

type Props = {
  product: Product;
  className?: string;
};

const CardItem: React.FC<Props> = ({ product, className = '' }) => {
  const { id, itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;
  const fullName = `${name} (MQ${id.toString().padStart(3, '0')})`;
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(
    () => storage.getAllItems<string>('favourites')?.includes(itemId) || false,
  );
  const [isInCart, setIsInCart] = useState(
    () => storage.getAllItems<string>('cart')?.includes(itemId) || false,
  );

  // useEffect(() => {
  //   const handleStorageUpdate = () => {
  //     setIsFavourite(
  //       storage.getAllItems('favourites')?.includes(itemId) ?? false,
  //     );
  //     setIsInCart(storage.getAllItems('cart')?.includes(itemId) ?? false);
  //   };

  //   window.addEventListener('storage', handleStorageUpdate);

  //   return () => window.removeEventListener('storage', handleStorageUpdate);
  // }, [itemId]);

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isAdded = storage.smartAddToArray('cart', product.itemId);

    setIsInCart(isAdded);
  };

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isAdded = storage.smartAddToArray('favourites', product.itemId);

    setIsFavourite(isAdded);
  };

  const handleCartClick = () => {
    navigate(`/${product.category}/${product.itemId}`);
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

export default CardItem;
