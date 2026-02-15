import { Product } from '../../../types/Product';
import styles from './CartProduct.module.scss';
import iconClose from '../../../img/icons/icon-close-grey.png';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../app/store/GlobalContext';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  const { cart, setCart, removeFromCart, setSelectedProduct } =
    useContext(GlobalContext);
  const [amount, setAmount] = useState(product.quantity);

  const updateCartQuantity = (newAmount: number) => {
    const updatedCart = cart.map(item =>
      item.itemId === product.itemId ? { ...item, quantity: newAmount } : item,
    );

    setCart(updatedCart);
  };

  const handleIncrease = () => {
    const newAmount = amount + 1;

    setAmount(newAmount);
    updateCartQuantity(newAmount);
  };

  const handleDecrease = () => {
    if (amount > 1) {
      const newAmount = amount - 1;

      setAmount(newAmount);
      updateCartQuantity(newAmount);
    }
  };

  return (
    <li className={styles.cart__product}>
      <div className={styles.cart__product_info}>
        <img
          src={iconClose}
          alt="Close"
          className={styles.cart__product_iconClose}
          onClick={() => removeFromCart(product.itemId)}
        />
        <Link
          to={`./${product.itemId}`}
          className={styles.cart__product_image}
          onClick={() => setSelectedProduct(product)}
        >
          <img src={product.image} alt={product.name} />
        </Link>
        <h3 className={styles.cart__product_title}>{product.name}</h3>
      </div>

      <div className={styles.cart__product_purchaseOptions}>
        <div className={styles.cart__product_amountContent}>
          <button
            className={
              `${styles.cart__product_amountButton} ` +
              (amount > 1
                ? styles.cart__product_amountButton_active
                :'')
            }
            disabled={amount <= 1}
            onClick={handleDecrease}
          >
            -
          </button>
          <span>{amount}</span>
          <button
            className={`${styles.cart__product_amountButton} ${styles.cart__product_amountButton_active}`}
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <p className={styles.cart__product_price}>${product.price * amount}</p>
      </div>
    </li>
  );
};
