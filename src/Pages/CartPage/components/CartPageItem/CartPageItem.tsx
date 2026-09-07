import React, { useContext } from 'react';
import styles from './CartPageItem.module.scss';
import { Phone } from '../../../../types/Phone';
import closeIcon from '../../../../shared/images/icones/close-icon.png';
import minusIcon from '../../../../shared/images/icones/minus-icon.png';
import plusIcon from '../../../../shared/images/icones/plus-icon.png';
import { CartContext } from '../../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

type Props = {
  productItem: Phone;
  quantity: number;
};

export const CartPageItem: React.FC<Props> = ({ productItem, quantity }) => {
  const { increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className={styles.item}>
      <div className={styles['item__first-row']}>
        <img
          onClick={() => clearCart(productItem.id)}
          src={closeIcon}
          alt="closeIcon"
          className={styles.item__icon}
        />
        <img
          src={productItem.images[0]}
          className={styles.item__image}
          onClick={() => navigate(`/product/${productItem.id}`)}
        />
        <span
          style={{ cursor: 'pointer' }}
          className="body-text"
          onClick={() => navigate(`/product/${productItem.id}`)}
        >
          {productItem.name}
        </span>
      </div>
      <div className={styles['item__second-row']}>
        <div className={styles.item__buttons}>
          <button className={styles.item__button} onClick={() => decreaseQuantity(productItem.id)}>
            <img src={minusIcon} alt="minusIcon" className={styles.item__icon} />
          </button>
          <span>{quantity}</span>
          <button className={styles.item__button} onClick={() => increaseQuantity(productItem.id)}>
            <img src={plusIcon} alt="plusIcon" className={styles.item__icon} />
          </button>
        </div>
        <h3 style={{ fontWeight: '800' }}>{`$${Number(productItem.priceDiscount) * quantity}`}</h3>
      </div>
    </div>
  );
};
