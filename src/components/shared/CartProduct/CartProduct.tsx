import { useContext } from 'react';
import { CartType } from '../../CartPage/CartPage';
import Counter from '../Counter';
import styles from './CartProduct.module.scss';
import { CartContext } from '../../../contexts/CartContextProvider';

export interface CartProductType {
  cartItem: CartType;
  setNewCount: (id: number, count: number) => void;
}

export const CartProduct: React.FC<CartProductType> = ({
  cartItem,
  setNewCount,
}) => {
  const { cartCards, setCartCards } = useContext(CartContext);

  return (
    <div className={styles.cartProduct}>
      <div
        className={styles.cartProduct__remove}
        onClick={() => {
          setCartCards(cartCards.filter(c => c.id !== cartItem.id));
        }}
      ></div>

      <div className={styles.cartProduct__image}>
        <div className={styles['cartProduct__image-wrapper']}>
          <img
            className={styles['cartProduct__image-src']}
            src={cartItem.image}
          />
        </div>
      </div>

      <p className={styles.cartProduct__name}>{cartItem.name}</p>

      <div className={styles.cartProduct__count}>
        <Counter
          setNewCount={(count: number) => setNewCount(cartItem.id, count)}
          count={cartItem.count}
        />

        <p className={styles.cartProduct__price}>${cartItem.price}</p>
      </div>
    </div>
  );
};
