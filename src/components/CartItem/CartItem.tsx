import { useContext } from 'react';
import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';
import { CartandFavContext } from '../CartandFavProvider';
import classNames from 'classnames';

type Props = {
  product: Product;
  counter: number;
};

export const CartItem = ({ product, counter }: Props) => {
  const { setCart } = useContext(CartandFavContext);
  const totalPrice = product.price * counter;

  const handleDelete = () => {
    setCart(prevCart => prevCart.filter(item => item.id !== product.itemId));
  };

  const handlePlusProduct = () => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === product.itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleMinusProduct = () => {
    if (counter < 2) {
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === product.itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <img
            src={`${import.meta.env.BASE_URL}/img/icons/close.svg`}
            alt="close"
          />
        </button>
        <div className={styles.productPhoto}>
          <img
            className={styles.productPhoto_img}
            src={product.image}
            alt="productPhoto"
          />
        </div>
        <span
          className={styles.productTitle}
        >{`${product.name}(iMT9G2FS/A)`}</span>
      </div>
      <div className={styles.row}>
        <div className={styles.countButtons}>
          <button
            className={classNames(styles.countButton, {
              [styles.disabled]: counter < 2,
            })}
            onClick={handleMinusProduct}
          >
            <img
              src={
                counter < 2
                  ? `${import.meta.env.BASE_URL}/img/icons/minus-disabled.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/minus.svg`
              }
              alt="minus"
            />
          </button>
          <div className={styles.productCounter}>{counter}</div>
          <button className={styles.countButton} onClick={handlePlusProduct}>
            <img
              src={`${import.meta.env.BASE_URL}/img/icons/plus.svg`}
              alt="plus"
            />
          </button>
        </div>
        <span className={styles.productPrice}>{`${totalPrice}$`}</span>
      </div>
    </div>
  );
};
