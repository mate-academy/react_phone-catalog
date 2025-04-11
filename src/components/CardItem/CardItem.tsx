import React from 'react';
import styles from './CardItem.module.scss';
import favouriteIcon from '../../assets/img/tools/favourite_ico.svg';
import { Product } from '../../types/products';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
  className?: string;
};

const CardItem: React.FC<Props> = ({ product, className = '' }) => {
  const { id, name, fullPrice, price, screen, capacity, ram, image } = product;
  const fullName = `${name} (MQ${id.toString().padStart(3, '0')})`;
  const navigate = useNavigate();

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
        <button className={styles.card__addBtn} onClick={handleAddToCartClick}>
          Add to cart
        </button>
        <button
          className={styles.card__favouriteBtn}
          onClick={handleFavouriteClick}
        >
          <img src={favouriteIcon} alt="favourite" />
        </button>
      </div>
    </article>
  );
};

export default CardItem;
