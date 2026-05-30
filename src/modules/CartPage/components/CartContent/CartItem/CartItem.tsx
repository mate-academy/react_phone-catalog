import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/store/hooks";
import * as actionCart from "../../../../../app/store/slices/cartSlice";

import type { CartProduct } from "../../../../shared/types/Product";

import minus from "../../../../../assets/icons/minus.svg";
import minusGray from "../../../../../assets/icons/minus-gray.svg";

import styles from "./CartItem.module.scss";

type Props = {
  product: CartProduct;
};

export const CartItem = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const handleItemIncr = () => {
    dispatch(actionCart.incrQuantity(product.id));
  };

  const handleItemDecr = () => {
    dispatch(actionCart.decrQuantity(product.id));
  };

  const handleRemoveItem = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(actionCart.removeItem(product.id));
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemPreview}>
        <button className={styles.itemDeleteBtn} onClick={handleRemoveItem}>
          <img src="src/assets/icons/close.svg" alt="Close icon" />
        </button>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.itemConatiner}
        >
          <img
            className={styles.itemImage}
            src={product.image}
            alt={product.name}
          />
        </Link>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.itemName}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.itemActions}>
        <div className={styles.itemCounter}>
          <button
            className={styles.itemRemoveItem}
            disabled={product.quantity === 1}
            onClick={handleItemDecr}
          >
            <img src={product.quantity === 1 ? minusGray : minus} alt="Minus" />
          </button>

          <div className={styles.itemQuantity}>{product.quantity}</div>
          <button className={styles.itemAddItem} onClick={handleItemIncr}>
            <img src="src/assets/icons/plus.svg" alt="Plus" />
          </button>
        </div>
        <div className={styles.itemPrice}>
          <p>${product.price}</p>
        </div>
      </div>
    </div>
  );
};
