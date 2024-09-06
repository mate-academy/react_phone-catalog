import React, { useContext } from 'react';
import styles from './CartProduct.module.scss';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/const';
import { ProductContext } from '../../context/ProductContext';

interface Props {
  product: Product;
  quantity: number;
}

const CartProduct: React.FC<Props> = ({ product, quantity }) => {
  const { removeFromCart, increase, decrease } = useContext(ProductContext);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <button
            className={styles.remove}
            onClick={() => removeFromCart(product.id)}
          >
            <img src={`${BASE_URL}/icons/Close.svg`} alt="Delete" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
          <p className={styles.name}>{product.name}</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.counter}>
            <button
              className={styles.action}
              onClick={() => decrease(product.id, quantity)}
            >
              <img src={`${BASE_URL}/icons/Minus.svg`} alt="Minus" />
            </button>
            <span className={styles.count}>{quantity}</span>
            <button
              className={styles.action}
              onClick={() => increase(product.id, quantity)}
            >
              <img src={`${BASE_URL}/icons/Plus.svg`} alt="Plus" />
            </button>
          </div>
          <p className={styles.productPrice}>{`$${product.price}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
