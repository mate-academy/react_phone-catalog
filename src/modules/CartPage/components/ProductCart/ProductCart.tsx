import { FC } from 'react';
import { Cart } from '../../../../types/Cart';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';
import styles from './ProductCart.module.scss';
import { BASE_URL } from '../../../../utils/constants';
import classNames from 'classnames';
import { useCatalog } from '../../../../contexts/CatalogProvider';

type Props = {
  cart: Cart;
};

export const ProductCart: FC<Props> = ({ cart }) => {
  const { name, image } = cart.product;
  const { closeUrl, minusUrl, plusUrl } = useIconSrc();
  const { removeFromCart, updateQuantity } = useCatalog();

  const isActiveMinus = cart.quantity <= 1;

  const deleteCart = () => {
    removeFromCart(cart.id);
  };

  return (
    <li className={styles.item}>
      <div className={styles.wrapperBoxOne}>
        <button className={styles.close} onClick={deleteCart}>
          <img src={closeUrl} alt="Product" />
        </button>
        <div className={styles.cartImage}>
          <img src={`${BASE_URL}${image}`} alt="Product" />
        </div>
        <h3 className={styles.itemTitle}>{name}</h3>
      </div>

      <div className={styles.wrapperBoxTwo}>
        <div className={styles.quantityButtons}>
          <button
            disabled={isActiveMinus}
            className={classNames(styles.countBtn, {
              [styles.disabled]: isActiveMinus,
            })}
            onClick={() => updateQuantity(cart.id, -1)}
          >
            <img src={minusUrl} alt="Minus icon" />
          </button>
          <div className={styles.quantity}>{cart.quantity}</div>
          <button
            className={styles.countBtn}
            onClick={() => updateQuantity(cart.id, +1)}
          >
            <img src={plusUrl} alt="Pluse icon" />
          </button>
        </div>
        <div className={styles.itemPrice}>
          ${`${cart.totalPrice ? cart.totalPrice : cart.price}`}
        </div>
      </div>
    </li>
  );
};
