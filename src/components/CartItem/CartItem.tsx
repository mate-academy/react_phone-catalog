import { useContext, useEffect, useState } from 'react';
import styles from './CartItem.module.scss';
import { AddedProductType } from '../../types/AddedProduct';
import { CartContext } from '../Contexts/CartContext';

type Props = {
  item: AddedProductType;
  countTotalPrice: () => void;
};

export const CartItem: React.FC<Props> = ({ item, countTotalPrice }) => {
  const { addedProducts, setAddedProducts, deleteCartProduct } =
    useContext(CartContext);

  const [amount, setAmount] = useState(item.product.price);

  const countAmount = () => {
    setAmount(item.quantity * item.product.price);
  };

  const decrease = () => {
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;

    setAddedProducts(currentsProducts =>
      currentsProducts.map(currentProduct =>
        currentProduct.id === item.id
          ? { ...currentProduct, quantity: newQuantity }
          : { ...currentProduct },
      ),
    );
  };

  const increase = () => {
    const newQuantity = item.quantity + 1;

    setAddedProducts(currentsProducts =>
      currentsProducts.map(currentProduct =>
        currentProduct.id === item.id
          ? { ...currentProduct, quantity: newQuantity }
          : { ...currentProduct },
      ),
    );
  };

  useEffect(() => {
    countAmount();
    countTotalPrice();
  }, [addedProducts]);

  return (
    <div className={styles.cartItem}>
      <div className={styles.item}>
        <button
          className="icon close"
          onClick={() => deleteCartProduct(item.id)}
        />

        <div className={styles.itemImg}>
          <img
            src={item.product.image}
            alt="itemModel"
            className={styles.img}
          />
        </div>

        <p className={`body-text-small ${styles.itemName}`}>
          {item.product.name}
        </p>
      </div>

      <div className={styles.total}>
        <div className={styles.itemsNumToggle}>
          <button
            className="button toggle"
            disabled={item.quantity === 1}
            onClick={decrease}
          >
            <span className="icon minus"></span>
          </button>
          <span className="body-text-small">{item.quantity}</span>
          <button className="button toggle" onClick={increase}>
            <span className="icon plus"></span>
          </button>
        </div>

        <h3 className={styles.amount}>${amount}</h3>
      </div>
    </div>
  );
};
