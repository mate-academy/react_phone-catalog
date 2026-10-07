import { useContext } from 'react';
import { CartProduct } from '../../../types/products';
import styles from './CartItem.module.scss';
import { CartContext } from '../../../contexts/CartContext';
import Plus from '../../../Icons/Plus.svg?react';
import Minus from '../../../Icons/Minus.svg?react';
import Close from '../../../Icons/Close.svg?react';

interface Props {
  item: CartProduct;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleChangeQuantity = (item: CartProduct, action: '+' | '-') => {
    let newQuantity = item.quantity;

    if (action === '+') {
      newQuantity = newQuantity + 1;
    } else {
      newQuantity = Math.max(1, newQuantity - 1);
    }

    const updatedProducts = cartProducts.map(product => {
      if (product.itemId === item.itemId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }

      return product;
    });

    setCartProducts(updatedProducts);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDeleteItem = (item: CartProduct) => {
    const updated = cartProducts.filter(p => p.itemId !== item.itemId);

    setCartProducts(updated);
  };

  return (
    <div className={styles['cart-item']}>
      <div className={styles['top-content']}>
        <button className={styles.cross} onClick={() => handleDeleteItem(item)}>
          <Close />
        </button>
        <div className={styles['img-wrapper']}>
          <img src={item.image} alt={item.itemId} />
        </div>
        <span className={styles['item-span']}>{item.name}</span>
      </div>
      <div className={styles['quantity-wrapper']}>
        <div className={styles['quantity-button-wrapper']}>
          <button
            className={styles['quantity-button']}
            onClick={() => handleChangeQuantity(item, '-')}
            disabled={item.quantity === 1}
          >
            <Minus />
          </button>
          {item.quantity}
          <button
            className={styles['quantity-button']}
            onClick={() => handleChangeQuantity(item, '+')}
          >
            <Plus />
          </button>
        </div>
        <h3 className={styles['item-price']}>${item.price}</h3>
      </div>
    </div>
  );
};
