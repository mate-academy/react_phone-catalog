import { Card } from '../../types/card';
import styles from './ProductCard.module.scss';

type Props = {
  card: Card;
  discount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ card, discount }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.card__image}
        src={card.images[0]}
        alt={`${card.namespaceId} image`}
      />
      <div className={styles.card__product_name}>{card.name}</div>
      <div className={styles.card__prices}>
        <div className={styles.card__prices__regular}>${card.priceRegular}</div>
        {discount && (
          <div className={styles.card__prices__discount}>
            ${card.priceDiscount}
          </div>
        )}
      </div>
      <div className={styles.card__detail}>
        <div className={styles.card__detail__row}>
          <div className={styles.card__detail__row__name}>Screen</div>
          <div className={styles.card__detail__row__param}>{card.screen}</div>
        </div>
        <div className={styles.card__detail__row}>
          <div className={styles.card__detail__row__name}>Capacity</div>
          <div className={styles.card__detail__row__param}>{card.capacity}</div>
        </div>
        <div className={styles.card__detail__row}>
          <div className={styles.card__detail__row__name}>RAM</div>
          <div className={styles.card__detail__row__param}>{card.ram}</div>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <a className={styles.card__buttons__add}>Add to cart</a>
        <button className={styles.card__buttons__like}></button>
      </div>
    </div>
  );
};
