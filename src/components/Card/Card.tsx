import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';
import { LikeButton } from '../LikeButton/LikeButton';
import { AddToCart } from './AddToCart';
import { useAppContext } from '../../contexts/AppContext';

type Props = {
  card: CardItem;
};

export const Card: React.FC<Props> = ({ card }) => {
  const {
    generateProductCode,
    toggleFavouriteCard,
    toggleAddToCart,
    favouriteProductsIds,
    cartProductsIds,
    refCardWidth,
  } = useAppContext();

  return (
    <div ref={refCardWidth} className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={card.image} alt={card.name} />
        </div>

        <div className={styles.about}>
          <p className={`bodyText ${styles.name}`}>
            {generateProductCode(card.name)}
          </p>
          <h3 className={styles.price}>${card.price}</h3>

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
          <AddToCart
            isActive={cartProductsIds.includes(card.id)}
            onClick={() => toggleAddToCart(card.id)}
          />
          <LikeButton
            isSelected={favouriteProductsIds.includes(card.id)}
            onClick={() => toggleFavouriteCard(card.id)}
          />
        </div>
      </div>
    </div>
  );
};
