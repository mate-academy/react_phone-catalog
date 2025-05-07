import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { changeFavorites } from '../../redux/favoritesSlice';
import { useAppDispatch } from '../../utils/hooks';
import { addCart } from '../../redux/cartSlice';

import { AllProduct } from '../../types/UnionType';

import styles from './Card.module.scss';

interface Props {
  card: AllProduct;
  showSale?: boolean;
  favorite: boolean;
  cart: boolean;
}

export const Card: React.FC<Props> = ({
  card,
  showSale = false,
  favorite,
  cart,
}) => {
  const dispatch = useAppDispatch();

  const handleFavoritesChange = () => {
    dispatch(changeFavorites(card));
  };

  const handleAddToCart = () => {
    dispatch(addCart(card));
  };

  return (
    <div className={styles.card}>
      <Link
        className={styles.card__imgLink}
        to={`/${card.category}/${card.name.split(' ').join('_').toLowerCase()}`}
      >
        <img
          src={'image' in card ? card.image : card.images[0]}
          alt={card.name}
          className={styles.card__img}
        />
      </Link>
      <Link
        to={`/${card.category}/${card.name.split(' ').join('_').toLowerCase()}`}
      >
        <span className={styles.card__title}>{card.name}</span>
      </Link>
      <div className={styles.card__prices}>
        <h3
          className={styles.card__price}
        >{`$${'price' in card ? card.price : card.priceDiscount}`}</h3>
        <h3 className={styles.card__fullPrice}>
          {showSale === true
            ? `$${'fullPrice' in card ? card.fullPrice : card.priceRegular}`
            : ''}
        </h3>
      </div>
      <hr />
      <div className={styles.card__infoBlock}>
        <p className={styles.card__infoTitle}>Screen</p>
        <p className={styles.card__infoText}>{card.screen}</p>
      </div>
      <div className={styles.card__infoBlock}>
        <p className={styles.card__infoTitle}>Capacity</p>
        <p className={styles.card__infoText}>{card.capacity}</p>
      </div>
      <div className={styles.card__infoBlock}>
        <p className={styles.card__infoTitle}>RAM</p>
        <p className={styles.card__infoText}>{card.ram}</p>
      </div>
      <div className={styles.card__buttons}>
        <button
          className={classNames(styles.card__cartButton, {
            [styles['card__cartButton--clicked']]: cart,
          })}
          onClick={() => handleAddToCart()}
        >
          {cart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={classNames(styles.card__favButton, {
            [styles['card__favButton--clicked']]: favorite,
          })}
          onClick={() => handleFavoritesChange()}
        />
      </div>
    </div>
  );
};
