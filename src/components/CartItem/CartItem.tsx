import React, { useContext } from 'react';
import styles from './CartItem.module.scss';
import cross from '../../images/icons/close.svg';
import plus from '../../images/icons/plus.svg';
import plusDis from '../../images/icons/plus_dis.png';
import minus from '../../images/icons/minus.svg';
import { ProductInCart } from '../../types/ProductInCart';
import { Link } from 'react-router-dom';
import { CartContext } from '../../store/CartContext';

type Props = {
  cartProduct: ProductInCart;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { image, name, price, category, itemId } = cartProduct.product;
  const { quantity } = cartProduct;
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className={styles.item}>
      <div className={styles.item__top}>
        <button
          className={styles['item__button-cross']}
          onClick={() => removeFromCart(itemId)}
        >
          <img src={cross} alt="Close" className={styles.item__image} />
        </button>

        <div className={styles['item__img-container']}>
          <img src={image} className={styles.item__image} />
        </div>

        <Link to={`/${category}/${itemId}`} className={styles.item__name}>
          {name}
        </Link>
      </div>

      <div className={styles.item__bottom}>
        <div className={styles['item__quantity-block']}>
          <button
            className={styles['item__button-count']}
            onClick={() => decreaseQuantity(itemId)}
          >
            <img src={minus} alt="minus" className={styles.item__img} />
          </button>
          <p className={styles.item__quantity}>{quantity}</p>
          <button
            onClick={() => increaseQuantity(itemId)}
            className={styles['item__button-count']}
          >
            <img
              src={quantity === 1 ? plusDis : plus}
              alt="plus"
              className={styles.item__img}
            />
          </button>
        </div>

        <div className={styles.item__price}>{`$${price * quantity}`}</div>
      </div>
    </div>
  );
};
