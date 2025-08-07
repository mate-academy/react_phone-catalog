import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';
import { LikeButton } from '../LikeButton/LikeButton';
import { AddToCart } from './AddToCart';
import { useAppContext } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';

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

  function handleAddToCartClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggleAddToCart(card.id);
  }

  function handleAddToFavouriteClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavouriteCard(card.id);
  }

  return (
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
            {generateProductCode(card.name)}
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
              <p className="cardValuesText">{card.capacity}</p>
              <p className="cardValuesText">{card.ram}</p>
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
  );
};
