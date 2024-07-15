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
    <div className={styles.CartItem}>
      <div className={styles.Wrapper}>
        <div className={styles.Descriptions}>
          <button onClick={handleDeleteProduct} className={styles.ButtonDelete}>
            <img src={closeIcon} alt="delete" />
          </button>

          <img className={styles.Picture} src={image} alt="product" />

          <p className={styles.ProductName}>{name}</p>
        </div>

        <div className={styles.QuantitiesWrapper}>
          <div className={styles.Quantities}>
            <button
              onClick={handleDecreaseQuantity}
              className={styles.ButtonQuantity}
            >
              <IconMinus />
            </button>
            <p className={styles.Quantity}>{quantity}</p>
            <button
              onClick={handleIncreaseQuantity}
              className={cn(styles.ButtonQuantity, styles.ButtonQuantityActive)}
            >
              <IconPlus />
            </button>
          </div>

          <p className={styles.ProductPrice}>${price * quantity}</p>
        </div>
      </div>
    </div>
  );
};
