import styles from './Card.module.scss';
import type { Card as CardItem } from '../../types/Card';
import { LikeButton } from '../LikeButton/LikeButton';
import {
  getCartProducts,
  getFavouriteProducts,
  saveCartProducts,
  saveFavouriteProducts
} from '../../modules/shared/services/localStorage';
import { useEffect, useState } from 'react';
import { AddToCart } from './AddToCart';

type Props = {
  card: CardItem;
}

export const Card: React.FC<Props> = ({ card }) => {
  const [favouriteProducts, setFavouriteProducts] = useState(getFavouriteProducts());
  const [cartProducts, setCartProducts] = useState(getCartProducts());

  useEffect(() => {
    setFavouriteProducts(getFavouriteProducts());
    setCartProducts(getCartProducts());
  }, [getFavouriteProducts(), getCartProducts()]);

  function generateProductCode(name: string): string {
    return name.includes('14') ? name + ` (MQ023)` : name + ' (iMT9G2FS/A)';
  }

  function toggleFavouriteCard() {
    if (favouriteProducts.includes(card.id)) {
      saveFavouriteProducts(favouriteProducts.filter((id: number) => id !== card.id));
      return;
    }

    saveFavouriteProducts([...favouriteProducts, card.id]);
  }

  function toggleAddToCart() {
    if (cartProducts.includes(card.id)) {
      saveCartProducts(cartProducts.filter((id: number) => id !== card.id));
      setCartProducts(cartProducts.filter((id: number) => id !== card.id));
      return;
    }

    saveCartProducts([...cartProducts, card.id]);
  }

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
          isActive={cartProducts.includes(card.id)}
          onClick={toggleAddToCart}
        />
        <LikeButton
          isSelected={getFavouriteProducts().includes(card.id)}
          onClick={toggleFavouriteCard} />
      </div>
    </div>
  );
}