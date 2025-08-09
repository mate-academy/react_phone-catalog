import { Link } from 'react-router-dom';
import { CartItem } from '../../types/CartItem';
import styles from './CartItemContainer.module.scss';
import { useCart } from '../../context/CartContext';

type Props = {
  item: CartItem;
};

export const CartItemContainer: React.FC<Props> = ({ item }) => {
  const { changeQuantity, removeFromCart } = useCart();

  const handleDecrement = () => {
    changeQuantity(item.product?.itemId, item.amount - 1);
  };

  const handleIncrement = () => {
    changeQuantity(item.product?.itemId, item.amount + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.product?.itemId);
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartTop}>
        <button className={styles.cartTop__button} onClick={handleRemove}></button>

        <Link
          to={`/${item.product?.category}/${item.product?.itemId}`}
          className={styles.cartTop__link}
        >
          <div className={styles.cartTop__imgContainer}>
            <img src={item.product?.image} alt={item.product?.name} />
          </div>

          <p className={styles.cartTop__itemName}>{item.product?.name}</p>
        </Link>
      </div>
      <div className={styles.cartButtom}>
        <div className={styles.cartButtom__count}>
          <button
            className={styles.cartButtom__countButtonDecrement}
            onClick={handleDecrement}
          ></button>
          <span className={styles.cartButtom__countNumber}>{item.amount}</span>
          <button
            className={styles.cartButtom__countButtonIncrement}
            onClick={handleIncrement}
          ></button>
        </div>
        <span className={styles.cartButtom__price}>
          ${item.product ? item.product.price * item.amount : 0}
        </span>
      </div>
    </div>
  );
};
