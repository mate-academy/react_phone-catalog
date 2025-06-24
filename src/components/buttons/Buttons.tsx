import styles from './Buttons.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { addToCart } from '../../features/CartSlice';
import { useAppDispatch } from '../../app/hooks';
import { FullProduct } from '../../types/product';
type ButtonsProps = {
  product: FullProduct;
};
export const Buttons = ({ product }: ButtonsProps) => {
  const dispach = useAppDispatch();
  const handleAddToCart = (product: FullProduct) => dispach(addToCart(product));

  return (
    <div className={styles.buttons}>
      <div
        className={styles.buttons__addCart}
        onClick={() => handleAddToCart(product)}
      >
        Add to cart
      </div>
      <div className={styles.buttons__heart}>
        <FaRegHeart className={styles.buttons__favorite} />
      </div>
    </div>
  );
};
