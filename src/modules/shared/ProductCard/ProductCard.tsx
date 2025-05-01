import {
  useAppDispatch,
  useAppSelector,
  useCart,
  useLocalStorage,
} from '../../../app/hooks';
import styles from './ProductCard.module.scss';
import IconHeart from '../../../img/icons/icon-heart.png';
import { Product } from '../../../types/Product';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '../../../styles/_variables.scss';
import { add } from 'cypress/types/lodash';

type Props = {
  product: Product;
};

// function generateItemId({
//   name,
//   capacity,
//   color,
//   ram,
// }: {
//   name: string;
//   capacity: string;
//   color: string;
//   ram: string;
// }) {
//   return (
//     name.toLowerCase().replace(/\s+/g, '-') +
//     '-' +
//     capacity.toLowerCase() +
//     '-' +
//     color.toLowerCase() +
//     '-' +
//     ram.toLowerCase()
//   );
// }

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { itemId, name, capacity, price, image, screen, ram } = product;

  const { cart, toggleCartItem, clearCart } = useCart();

  // const [_, setState] = useState({});
  // const forceRerender = () => setState({});

  const isInCart = useMemo(
    () => cart.some(p => p.itemId === itemId),
    [cart, itemId],
  );

  const makeGapBetween = (value: string) => {
    let numbers = '';
    let letters = '';

    for (const symbol of value) {
      if (+symbol) {
        numbers += symbol;
      } else {
        letters += symbol;
      }
    }

    return numbers + ' ' + letters;
  };

  console.log(
    'cart:',
    cart.map(p => p.itemId),
  );

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className={styles.productCard}>
      <img src={image} alt={name} className={styles.productCard__image} />
      <button className={styles.emptyCart} onClick={clearCart}></button>
      <div className={styles.productCard__info}>
        <h3 className={styles.productCard__title}>{name}</h3>
        <p className={styles.productCard__price}>${price}</p>
        <div className={styles.productCard__features}>
          <p className={styles.productCard__screen}>
            <span className={styles.productCard__property}>Screen:</span>
            <span className={styles.productCard__value}>{screen}</span>
          </p>
          <p className={styles.productCard__capacity}>
            <span className={styles.productCard__property}>Capacity:</span>
            <span className={styles.productCard__value}>
              {makeGapBetween(capacity)}
            </span>
          </p>
          <p className={styles.productCard__ram}>
            <span className={styles.productCard__property}>ram:</span>
            <span className={styles.productCard__value}>
              {makeGapBetween(ram)}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button
          className={styles.productCard__button_addToCart}
          onClick={() => toggleCartItem(product)}
          style={{
            backgroundColor: isInCart ? '#323542' : '#905bff',
          }}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <button className={styles.productCard__button_favorites}>
          <img src={IconHeart} alt="Icon-heart" />
        </button>
      </div>
    </div>
  );
};
