import { Link } from 'react-router-dom';
import { CartItem } from '../../types/CartItem';
import styles from './CartItemContainer.module.scss';

type Props = {
  item: CartItem;
};

export const CartItemContainer: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.cart}>
      <div className={styles.cartTop}>
        <button className={styles.cartTop__button}></button>

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
          <button></button>
        </div>
      </div>
    </div>
  );
};
