import cn from 'classnames';

import closeIcon from '../../assets/images/close.svg';

import { IconMinus } from '../../ui/IconMinus';
import { IconPlus } from '../../ui/IconPlus';

import { useProductsCart } from '../../store/CartProvider';
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
  const { deleteProduct, increaseQuantity, decreaseQuantity } =
    useProductsCart();

  const handleDeleteProduct = () => {
    deleteProduct(id);
  };

  const handleIncreaseQuantity = () => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(id);
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
