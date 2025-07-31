import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';
import { LikeButton } from '../LikeButton/LikeButton';

type Props = {
  card: CardItem;
}

export const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={card.image}
          alt={card.name}
        />
      </div>

      <div className={styles.about}>
        <p className="bodyText">{card.name}</p>
        <h3>${card.price}</h3>

        <div className={styles.line}></div>

        <div className={styles.description}>
          <div className={styles.keys}>
            <p className="smallText">Screen</p>
            <p className="smallText">Capacity</p>
            <p className="smallText">RAM</p>
          </div>

          <div className={styles.values}>
            <p className="cardValuesText">{card.screen}</p>
            <p className="cardValuesText">{card.capacity}</p>
            <p className="cardValuesText">{card.ram}</p>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={`buttonText ${styles.button}`}>
          Add to cart
        </button>
        <LikeButton />
      </div>
    </div>
  );
}