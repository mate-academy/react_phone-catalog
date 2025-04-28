import React from "react";
import { ICart } from "../../../../interfaces/Cart.interface";
import styles from './CartItem.module.scss';
import { Link } from "react-router-dom";
import { useActions } from "../../../../store/useActions";

const CartItem: React.FC<{ item: ICart }> = ({ item }) => {
  const { deleteWithCart, changeQuantity } = useActions();
  const LinkTo = `/${item.product.category}/${item.product.itemId}`;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button onClick={() => deleteWithCart(item)}>
          <img src="/images/icons/Close.png" />
        </button>
        <div className={styles.left__img}>
          <Link to={LinkTo}><img src={item.product.image}/></Link>
        </div>
          <Link to={LinkTo}><h3>{item.product.name}</h3></Link>
      </div>

      <div className={styles.right}>
        <div className={styles.right__buttons}>
          <button onClick={() => changeQuantity({ id: item.id, type: 'minus'})}>
            -
          </button>
          <h4>{item.quantity}</h4>
          <button onClick={() => changeQuantity({ id: item.id, type: 'plus'})}>
            +
          </button>
        </div>
        <div className={styles.right__price}>{`$${item.product.price}`}</div>
      </div>
    </div>
  )
}

export default CartItem;
