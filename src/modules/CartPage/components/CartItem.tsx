import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { cartProductsSlice } from '../../../features/cartProducts';
import { CartProduct } from '../../../types/CartProduct';
import styles from './CartItem.module.scss';
import remove from '/img/close.svg';
import minus from '/img/minus.svg';
import plus from '/img/plus.svg';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleProductRemove = (id: string, price: number) => {
    dispatch(cartProductsSlice.actions.removeProduct({ id, price }));
  };

  const handleQuantityChange = (delta: 1 | -1) => {
    dispatch(cartProductsSlice.actions.changeQuantity({ id: item.id, delta }));
  };

  return (
    <div className={styles.item}>
      <div className={styles.mobile_box_upper}>
        <img
          src={remove}
          alt="remove icon"
          onClick={() =>
            handleProductRemove(
              item.id,
              item.product.priceDiscount * item.quantity,
            )
          }
          className={styles.remove_icon}
        />

        <Link to={`/${item.product.category}/${item.product.id}`}>
          <img src={item.product.images[0]} className={styles.item_image} />
        </Link>

        <Link to={`/${item.product.category}/${item.product.id}`}>
          <p className={styles.item_name}>{item.product.name}</p>
        </Link>
      </div>

      <div className={styles.mobile_box_lower}>
        <div className={styles.counter}>
          <button
            className={styles.counter_button}
            onClick={() => handleQuantityChange(-1)}
          >
            <img src={minus} alt="minus icon" style={{ userSelect: 'none' }} />
          </button>

          <p className={styles.counter_text}>{item.quantity}</p>

          <button
            className={styles.counter_button}
            onClick={() => handleQuantityChange(1)}
          >
            <img src={plus} alt="plus icon" style={{ userSelect: 'none' }} />
          </button>
        </div>

        <p className={styles.item_price}>
          ${item.product.priceDiscount * item.quantity}
        </p>
      </div>
    </div>
  );
};
