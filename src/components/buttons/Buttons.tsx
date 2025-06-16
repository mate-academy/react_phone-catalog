import styles from './Buttons.module.scss';
import { FaRegHeart } from "react-icons/fa";
export const Buttons = () => {
  return (
    <div className={styles.buttons}>
            <div className={styles.buttons__addCart}>Add to cart</div>
      <div className={styles.buttons__heart}>
      <FaRegHeart className={styles.buttons__favorite} /></div>
          </div>
  )
}
