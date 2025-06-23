import styles from './Buttons.module.scss';
import { FaRegHeart } from "react-icons/fa";
import { addToCart } from '../../features/CartSlice';
import { useAppDispatch } from '../../app/hooks';
import { Product } from '../../types/product';
type ButtonsProps = {
  product: Product;
}
export const Buttons = ({ product }:ButtonsProps) => {
  const dispach = useAppDispatch();
  const handleAddToCart = (product:Product) =>
    dispach(addToCart(product));

  return (
    <div className={styles.buttons}>
      <div className={styles.buttons__addCart}
      onClick={()=>handleAddToCart(product)}>Add to cart</div>
      <div className={styles.buttons__heart}>
      <FaRegHeart className={styles.buttons__favorite} /></div>
          </div>
  )
}
