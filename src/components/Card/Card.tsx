import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';

type Props = {
  card: CardItem;
}

export const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.card}>
      <img src={card.image} alt={card.name} />

      <div className={styles.about}>
        <p className="bodyText">{card.name}</p>
        <h3>$ {card.price}</h3>
        <hr />

        <div className={styles.description}>
          <div className="keys">
            <p className="smallText">Screen</p>
            <p className="smallText">Capacity</p>
            <p className="smallText">RAM</p>
          </div>

          <div className="values">
            <p className="cardValuesText">{card.screen}</p>
            <p className="cardValuesText">{card.capacity}</p>
            <p className="cardValuesText">{card.ram}</p>
          </div>
        </div>
      </div>


    </div>
  );
}