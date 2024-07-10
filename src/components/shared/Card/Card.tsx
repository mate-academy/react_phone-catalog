import { useContext, useEffect, useRef, useState } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { CartContext } from '../../../contexts/CartContextProvider';
import { ProductContext } from '../../../contexts/ProductContextProvider';
import { LikeContext } from '../../../contexts/LikeContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartCard } from '../../../types/Card';

export interface CardTypeFor {
  itemId: string;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  category: string;
  ram: string;
  image: string;
  fullPrice: number;
  isHot?: boolean;
}

export const Card: React.FC<CardTypeFor> = ({
  itemId,
  name,
  price,
  screen,
  capacity,
  category,
  ram,
  image,
  fullPrice,
  isHot,
}) => {
  const { pathname } = useLocation();
  const pRef = useRef<HTMLParagraphElement>(null);
  const optimalWidth = 50;

  const [paddingStyles, setPaddingStyles] = useState({});

  const navigate = useNavigate();

  const { cards } = useContext(ProductContext);
  const { cartCards, setCartCards } = useContext(CartContext);
  const { likeCards, setLikeCards } = useContext(LikeContext);

  const resizeCheck = () => {
    if (
      pRef.current &&
      pRef.current.clientHeight &&
      pRef.current.clientHeight > optimalWidth
    ) {
      setPaddingStyles({
        paddingInline: `${(pRef.current.clientHeight - optimalWidth) / 2 + 10}px`,
      });
    }
  };

  useEffect(() => {
    resizeCheck();

    window.addEventListener('resize', () => resizeCheck());

    return () => {
      window.removeEventListener('resize', () => resizeCheck());
    };
  }, [pRef.current?.clientHeight]);

  const isInCart = cartCards.some(card => card.itemId === itemId);
  const isLiked = likeCards.some(card => card.itemId === itemId);

  const textBtn = isInCart ? 'Added to cart' : 'Add to cart';

  const addToCart = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      const ncard: CartCard = {
        ...cards.filter(card => card.itemId === itemId)[0],
        count: 1,
      };

      setCartCards([...cartCards, ncard]);
    } else {
      setCartCards(cartCards.filter(card => card.itemId !== itemId));
    }
  };

  const addToLike = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      setLikeCards(likeCards.filter(card => card.itemId !== itemId));
    } else {
      setLikeCards([
        ...likeCards,
        cards.filter(card => card.itemId === itemId)[0],
      ]);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        window.scrollTo(0, 0);

        navigate(`/${category}/${itemId}`, { state: pathname });
      }}
    >
      <div className={styles['card__image-title-wrapper']}>
        <div className={styles['card__image-container']}>
          <div className={styles['card__image-envelope']} style={paddingStyles}>
            <div className={styles.card__image}>
              <img className={styles['card__image-inner']} src={image} />
            </div>
          </div>

          <p ref={pRef} className={styles['card__image-title']}>
            {name}
          </p>
        </div>
      </div>

      <h3 className={styles.card__price}>
        ${price}{' '}
        {isHot && <span className={styles.card__fullPrice}>${fullPrice}</span>}
      </h3>

      <div className={styles.card__line}></div>

      <ul className={styles.card__list}>
        <li className={styles['card__list-item']}>
          <span className={styles['card__list-title']}>Screen</span>

          <span className={styles['card__list-desc']}>{screen}</span>
        </li>
        <li className={styles['card__list-item']}>
          <span className={styles['card__list-title']}>Capacity</span>

          <span className={styles['card__list-desc']}>{capacity}</span>
        </li>
        <li className={styles['card__list-item']}>
          <span className={styles['card__list-title']}>RAM</span>

          <span className={styles['card__list-desc']}>{ram}</span>
        </li>
      </ul>

      <div className={styles.card__buttons}>
        <a
          className={classNames(
            `${styles.card__btn} ${styles['card__btn--buy']}`,
            {
              [styles['card__btn--active']]: isInCart,
            },
          )}
          onClick={addToCart}
        >
          {textBtn}
        </a>

        <a
          className={classNames(
            `${styles.card__btn} ${styles['card__btn--like']}`,
            { [styles['card__btn--active-link']]: isLiked },
          )}
          onClick={addToLike}
        ></a>
      </div>
    </div>
  );
};
