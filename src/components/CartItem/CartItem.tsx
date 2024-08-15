import cn from 'classnames';

import closeIcon from '../../assets/images/close.svg';

import { IconMinus } from '../../ui/IconMinus';
import { IconPlus } from '../../ui/IconPlus';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from '../../store/slices/cartSlice';
import styles from './CartItem.module.scss';

type Props = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({
  id,
  name,
  image,
  price,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.wrapper}>
        <div className={styles.descriptions}>
          <button onClick={handleDeleteProduct} className={styles.button}>
            <img src={closeIcon} alt="delete" />
          </button>

          <img className={styles.picture} src={image} alt="product" />

          <p className={styles.product}>{name}</p>
        </div>

        <div className={styles.quantitiesWrapper}>
          <div className={styles.quantities}>
            <button
              onClick={handleDecreaseQuantity}
              className={styles.buttonQuantity}
            >
              <IconMinus />
            </button>
            <p className={styles.quantity}>{quantity}</p>
            <button
              onClick={handleIncreaseQuantity}
              className={cn(
                styles.buttonQuantity,
                styles['buttonQuantity--active'],
              )}
            >
              <IconPlus />
            </button>
          </div>

          <p className={styles.price}>${price * quantity}</p>
        </div>
      </div>
    </div>
  );
};
