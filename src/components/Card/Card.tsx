import classNames from 'classnames';
import styles from './Card.module.scss';
import { CardDetail } from '../CardDetail/CardDetail';
import { Icon } from '../ui/Icon';
import { CardButton } from '../ui/CardButton';
import { Product } from '../../types/Product';
import { Link, useSearchParams } from 'react-router-dom';

type CardProps = {
  item: Product;
  isInCart?: boolean;
  isFavorite: boolean;
  toggleFavorite: () => void;
  updateCart: (item: Product, action: 'add' | 'remove') => void;
};

export const Card: React.FC<CardProps> = ({
  item,
  isInCart,
  isFavorite,
  toggleFavorite,
  updateCart,
}) => {
  const [searchParams] = useSearchParams();

  const handleToggleCart = () => {
    if (isInCart) {
      updateCart(item, 'remove'); // Видалення товару з кошика
    } else {
      updateCart(item, 'add'); // Додавання товару в кошик
    }
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/${item.category}/:${item.itemId}`}
        state={{ search: searchParams.toString() }}
        className={styles.card__link}
      >
        <img
          src={item.image}
          alt={`${item.name} image`}
          className={styles.card__img}
        />
      </Link>

      <Link
        to={`/${item.category}/:${item.itemId}`}
        state={{ search: searchParams.toString() }}
      >
        <p className="body-text">{item.name}</p>
      </Link>

      <h4 className={styles.card__price}>
        ${item.price}{' '}
        {item.price !== item.fullPrice && (
          <span className={styles.card__priceFull}>${item.fullPrice}</span>
        )}
      </h4>

      <CardDetail label="Screen" value={item.screen} />
      <CardDetail label="Capacity" value={item.capacity} />
      <CardDetail label="RAM" value={item.ram} />

      <div className={styles.card__buttons}>
        <CardButton
          variant={isInCart ? 'selected' : 'primary'}
          onClick={handleToggleCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </CardButton>
        <button
          className={classNames(
            styles.card__btn,
            styles['card__btn--favorite'],
          )}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <Icon iconName="favorites-filled" />
          ) : (
            <Icon iconName="favorites" />
          )}
        </button>
      </div>
    </div>
  );
};
