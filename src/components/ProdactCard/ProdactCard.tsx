import { Link } from 'react-router-dom';
import { DividingLine } from '../DividingLine';
import { useProducts } from '../../shared/context/ProductsContext';
import { BtnAddToFavorite } from '../ui/BtnAddToFavorite/BtnAddToFavorite';
import { BtnAddToCart } from '../ui/BtnAddToCart/BtnAddToCart';

import { Card } from '../../shared/types/Card';
import styles from './ProdactCard.module.scss';

type Props = {
  card: Card;
  discount?: boolean;
};

export const ProdactCard: React.FC<Props> = ({ card, discount }) => {
  const { favorites } = useProducts();
  const isFavorite = favorites.some(item => item.itemId === card.itemId);

  return (
    <Link to={`/${card.category}/${card.itemId}`} className={styles.card__link}>
      <div
        className={styles.product__card}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className={styles.card__img}>
          <img src={`/react_phone-catalog/${card.image}`} alt={card.image} />
        </div>
        <p className={styles.card__title}>{card.name}</p>
        <div className={styles.card__price}>
          <h3 className={styles.price}>${card.price}</h3>
          {discount ? (
            <h3 className={styles.price__withoutDiscount}>${card.fullPrice}</h3>
          ) : null}
        </div>

        <DividingLine />

        <ul className={styles.card__characteristics}>
          <li className={styles.characteristic__item}>
            <span className={styles.characteristic__label}>Screen</span>
            <span className={styles.characteristic__value}>
              {card.screen.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
            </span>
          </li>
          <li className={styles.characteristic__item}>
            <span className={styles.characteristic__label}>Capacity</span>
            <span className={styles.characteristic__value}>
              {card.capacity.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
            </span>
          </li>
          <li className={styles.characteristic__item}>
            <span className={styles.characteristic__label}>RAM</span>
            <span className={styles.characteristic__value}>
              {card.ram.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
            </span>
          </li>
        </ul>
        <div className={styles.card__buttons}>
          <BtnAddToCart card={card} />
          <BtnAddToFavorite isFavorite={isFavorite} card={card} />
        </div>
      </div>
    </Link>
  );
};
