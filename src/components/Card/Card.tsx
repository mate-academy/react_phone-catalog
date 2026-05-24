import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';
import { LikeButton } from '../LikeButton/LikeButton';
import { AddToCart } from '../AddToCart/AddToCart';
import { useAppState, useAppDispatch } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { getFormattedCapacity } from '../../modules/shared/utils/getFormattedCapacity';
import { CardSkeleton } from './CardSkeleton';
import { getTranslation } from '../../modules/shared/utils/getTranslation';

type Props = {
  card: CardItem | undefined;
};

export const Card: React.FC<Props> = ({ card }) => {
  const { favouriteProducts, cartProducts, language } = useAppState();
  const { toggleFavouriteCard, toggleAddToCart, refCardWidth } =
    useAppDispatch();
  const t = getTranslation(language);

  function handleAddToCartClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (card) {
      toggleAddToCart(card.itemId);
    }
  }

  function handleAddToFavouriteClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    if (card) {
      toggleFavouriteCard(card.itemId);
    }
  }

  return card !== undefined ? (
    <Link
      to={`/${card.category}/${card.itemId}`}
      ref={refCardWidth}
      className={styles.card}
    >
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={`/${card.image}`}
            alt={card.name}
          />
        </div>

        <div className={styles.about}>
          <p className={`bodyText ${styles.name}`}>{card.name}</p>
          <h4 className={styles.price}>
            ${card.price}{' '}
            <span className={styles.fullPrice}>${card.fullPrice}</span>
          </h4>

          <div className={styles.line}></div>

          <div className={styles.description}>
            <div className={styles.keys}>
              <p className="smallText">{t.card.screen}</p>
              <p className="smallText">{t.card.capacity}</p>
              <p className="smallText">{t.card.ram}</p>
            </div>

            <div className={styles.values}>
              <p className="cardValuesText">{card.screen}</p>
              <p className="cardValuesText">
                {getFormattedCapacity(card.capacity)}
              </p>
              <p className="cardValuesText">{getFormattedCapacity(card.ram)}</p>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <AddToCart
            isActive={Object.keys(cartProducts).includes(card.itemId)}
            onClick={handleAddToCartClick}
          />
          <LikeButton
            isSelected={favouriteProducts.includes(card.itemId)}
            onClick={handleAddToFavouriteClick}
          />
        </div>
      </div>
    </Link>
  ) : (
    <CardSkeleton />
  );
};
