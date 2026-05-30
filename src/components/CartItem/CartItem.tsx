import React from 'react';
import styles from './CartItem.module.scss';
import { AppContext } from '../../AppContext';
import { Close, Minus, Plus } from '../../helpers/icons';
import { CartProductType } from '../../typies';

type Props = {
  cartItem: CartProductType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { cart, setCart, removeProductFromCart, CART_LOCAL_STORAGE_ITEM } =
    React.useContext(AppContext);

  const handleQuantityClick = (action: 'add' | 'remove') => {
    const newCartList = cart
      .map(item => {
        if (item.id === cartItem.id) {
          return {
            ...item,
            quantity: action === 'add' ? item.quantity + 1 : item.quantity - 1,
          };
        }

        return item;
      })
      .filter(item => item.quantity > 0);

    localStorage.setItem(CART_LOCAL_STORAGE_ITEM, JSON.stringify(newCartList));
    setCart(newCartList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <button
          className={styles.remove}
          onClick={() => removeProductFromCart(cartItem.id)}
        >
          <Close />
        </button>
        <img
          src={`./${cartItem.product.image}`}
          alt={`${cartItem.product.name} image`}
          className={styles.image}
        />
        <p className={styles.name}>{cartItem.product.name}</p>
      </div>

      <div className={styles.secondary}>
        <div className={styles.countWrapper}>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => handleQuantityClick('remove')}
          >
            <Minus />
          </button>
          <p className={styles.count}>{cartItem.quantity}</p>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => handleQuantityClick('add')}
          >
            <Plus />
          </button>
        </div>

        <p className={styles.totalPrice}>${cartItem.product.price}</p>
      </div>
    </div>
  );
};
