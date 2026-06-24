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
  const { id, quantity, product } = item;

  const dispatch = useAppDispatch();

  const handleProductRemove = (productId: string) => {
    dispatch(cartProductsSlice.actions.removeProduct({ id: productId }));
  };

  const handleQuantityChange = (delta: 1 | -1) => {
    dispatch(cartProductsSlice.actions.changeQuantity({ id: id, delta }));
  };

  const handleRemoveClick = () => {
    handleProductRemove(id);
  };

  const handleIncreaseClick = () => {
    handleQuantityChange(1);
  };

  const handleDecreaseClick = () => {
    handleQuantityChange(-1);
  };

  return (
    <div className={styles.item}>
      <div className={styles.mobile_box_upper}>
        <img
          src={remove}
          alt="remove icon"
          onClick={handleRemoveClick}
          className={styles.remove_icon}
        />

        <Link to={`/${product.category}/${product.id}`}>
          <img src={product.images[0]} className={styles.item_image} />
        </Link>

        <Link to={`/${product.category}/${product.id}`}>
          <p className={styles.item_name}>{product.name}</p>
        </Link>
      </div>

      <div className={styles.mobile_box_lower}>
        <div className={styles.counter}>
          <button
            className={styles.counter_button}
            onClick={handleDecreaseClick}
          >
            <img src={minus} alt="minus icon" style={{ userSelect: 'none' }} />
          </button>

          <p className={styles.counter_text}>{quantity}</p>

          <button
            className={styles.counter_button}
            onClick={handleIncreaseClick}
          >
            <img src={plus} alt="plus icon" style={{ userSelect: 'none' }} />
          </button>
        </div>

        <p className={styles.item_price}>${product.priceDiscount * quantity}</p>
      </div>
    </div>
  );
};
