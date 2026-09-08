import { useState } from 'react';
import cn from 'classnames';

import { Card } from '../../types/card';
import { useProducts } from '../../context/ProductsContext';
import styles from './CartCard.module.scss';

type Props = {
  card: Card;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setItemsAmount: React.Dispatch<React.SetStateAction<number>>;
};

export const CartCard: React.FC<Props> = ({
  card,
  setTotal,
  setItemsAmount,
}) => {
  const [productAmount, setProductAmount] = useState(card.amount || 1);
  const { cart, setCart } = useProducts();

  const removeCard = () => {
    const updatedCart = cart.filter(item => item.id !== card.id);

    setTotal(cur => cur - productAmount * card.price);
    setItemsAmount(cur => cur - productAmount);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleDec = () => {
    if (productAmount > 1) {
      setCart(prevCart => {
        return prevCart.map(item =>
          item.id === card.id
            ? { ...item, amount: (item.amount ?? 0) - 1 }
            : item,
        );
      });
      setProductAmount(cur => cur - 1);
      setItemsAmount(cur => cur - 1);
      setTotal(cur => cur - card.price);
    }
  };

  const increaseAmount = () => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === card.id
          ? { ...item, amount: (item.amount ?? 0) + 1 }
          : item,
      );
    });
    setProductAmount(cur => cur + 1);
    setItemsAmount(cur => cur + 1);
    setTotal(cur => cur + card.price);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__description}>
        <div
          className={styles.card__description__remove_button}
          onClick={removeCard}
        ></div>
        <img
          src={card.image}
          alt={card.name}
          className={styles.card__description__image}
        />
        <div className={styles.card__description__name}>{card.name}</div>
      </div>
      <div className={styles.card__details}>
        <div className={styles.card__details__quantity_control}>
          <div
            className={cn(
              `${styles.card__details__quantity_control__btns} ${styles.card__details__quantity_control__btns_dec}`,
              {
                [styles.card__details__quantity_control__btns_dec__disabled]:
                  productAmount === 1,
              },
            )}
            onClick={handleDec}
          ></div>
          <span className={styles.card__details__quantity_control__quantity}>
            {productAmount}
          </span>
          <div
            className={`${styles.card__details__quantity_control__btns}
            ${styles.card__details__quantity_control__btns_inc}`}
            onClick={increaseAmount}
          ></div>
        </div>

        <div className={styles.card__details__product_price}>{card.price}</div>
      </div>
    </div>
  );
};
