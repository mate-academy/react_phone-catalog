import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';
import { LikeButton } from '../LikeButton/LikeButton';
import { AddToCart } from '../AddToCart/AddToCart';
import { useAppContext } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { getFormattedCapacity } from '../../modules/shared/utils/getFormattedCapacity';

type Props = {
  card: CardItem | undefined;
};

export const Card: React.FC<Props> = ({ card }) => {
  const {
    toggleFavouriteCard,
    toggleAddToCart,
    favouriteProductsIds,
    cartProductsIds,
    refCardWidth,
  } = useAppContext();

  function handleAddToCartClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (card) {
      toggleAddToCart(card.id);
    }
  }

  function handleAddToFavouriteClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (card) {
      toggleFavouriteCard(card.id);
    }
  }

  return card !== undefined ? (
    <Link
      to={`/${card.category}/${card.itemId}`}
      ref={refCardWidth as React.Ref<HTMLAnchorElement>}
      className={styles.card}
    >
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={card.image} alt={card.name} />
        </div>

        <div className={styles.about}>
          <p className={`bodyText ${styles.name}`}>
            {card.name}
          </p>
          <h3 className={styles.price}>
            ${card.price}{' '}
            <span className={styles.fullPrice}>
              ${card.fullPrice}
            </span>
          </h3>

          <div className={styles.line}></div>

          <div className={styles.description}>
            <div className={styles.keys}>
              <p className="smallText">Screen</p>
              <p className="smallText">Capacity</p>
              <p className="smallText">RAM</p>
            </div>

            <div className={styles.values}>
              <p className="cardValuesText">{card.screen}</p>
              <p className="cardValuesText">{getFormattedCapacity(card.capacity)}</p>
              <p className="cardValuesText">{getFormattedCapacity(card.ram)}</p>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <AddToCart
            isActive={cartProductsIds.includes(card.id)}
            onClick={handleAddToCartClick}
          />
          <LikeButton
            isSelected={favouriteProductsIds.includes(card.id)}
            onClick={handleAddToFavouriteClick}
          />
        </div>
      </div>
    </Link>
  ) : (
    <div
      ref={refCardWidth as React.Ref<HTMLDivElement>}
      className={`${styles.card} ${styles.isLoading}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.about}>
          <p className={styles.name}>
          </p>
          <div className={styles.price}>
          </div>

          <div className={styles.description}>
            <div className={styles.keys}>
              <div className={styles.key}></div>
              <div className={styles.key}></div>
              <div className={styles.key}></div>
            </div>

            <div className={styles.values}>
              <div className={styles.value}></div>
              <div className={styles.value}></div>
              <div className={styles.value}></div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </div>
  );
};
