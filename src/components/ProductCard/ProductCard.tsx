import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ProductCard.module.scss';

import { useProducts } from '../../context/ProductsContext';
import { Card } from '../../types/card';
import { useTranslation } from 'react-i18next';

type Props = {
  card: Card;
  discount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ card, discount }) => {
  const { favorites, cart, setFavorites, setCart } = useProducts();
  const { t } = useTranslation();

  const handleLike = () => {
    const isAlreadyFavorite = favorites.some(item => item.id === card.id);

    let updatedFavorites;

    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter(item => item.id !== card.id);
    } else {
      updatedFavorites = [...favorites, card];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const addToCart = () => {
    const isInCart = cart.some(item => item.id === card.id);

    if (isInCart) {
      return;
    }

    const updatedCart = [...cart, { ...card, amount: 1 }];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className={`${styles.card}`}>
      <Link
        to={`/${card.category}/${card.itemId}`}
        className={styles.card__link_wrap}
        onClick={() => {
          window.scrollTo({
            top: 0,
          });
        }}
      >
        <img
          className={styles.card__image}
          src={card.image}
          alt={`${card.name} image`}
        />
        <div className={styles.card__product_name}>{card.name}</div>
        <div className={styles.card__prices}>
          <div className={styles.card__prices__regular}>${card.price}</div>
          {discount && (
            <div className={styles.card__prices__discount}>
              ${card.fullPrice}
            </div>
          )}
        </div>
      </Link>
      <div className={styles.card__detail}>
        <div className={styles.card__detail__row}>
          <div className={styles.card__detail__row__name}>{t('screen')}</div>
          <div className={styles.card__detail__row__param}>{card.screen}</div>
        </div>
        <div className={styles.card__detail__row}>
          <div className={styles.card__detail__row__name}>{t('capacity')}</div>
          <div className={styles.card__detail__row__param}>{card.capacity}</div>
        </div>
        <div className={styles.card__detail__row}>
          <div className={styles.card__detail__row__name}>{t('ram')}</div>
          <div className={styles.card__detail__row__param}>{card.ram}</div>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <div
          onClick={addToCart}
          className={cn(styles.card__buttons__add, {
            [styles.card__buttons__add__selected]: cart.some(
              item => item.id === card.id,
            ),
          })}
        >
          {cart.some(item => item.id === card.id)
            ? t('addedToCart')
            : t('addToCart')}
        </div>
        <button
          className={cn(styles.card__buttons__like, {
            [styles.card__buttons__like__active]: favorites.some(
              item => item.id === card.id,
            ),
          })}
          onClick={handleLike}
        ></button>
      </div>
    </div>
  );
};
