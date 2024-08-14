import classNames from 'classnames';
import styles from './Card.module.scss';
import { CardDetail } from '../CardDetail/CardDetail';
import { Icon } from '../ui/Icon';
import { CardButton } from '../ui/CardButton';

import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';

type CardProps = {
  item: Product;
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export const Card: React.FC<CardProps> = ({
  item,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className={styles.card}>
      <Link
        to={`/${item.category}/:${item.itemId}`}
        className={styles.card__link}
      >
        <img
          src={item.image}
          alt={`${item.name} image`}
          className={styles.card__img}
        />
      </Link>

      <p className="body-text">{item.name}</p>

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
          variant="primary"
          /* eslint-disable-next-line no-console */
          onClick={() => console.log('Checkout')}
        >
          Add to cart
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
