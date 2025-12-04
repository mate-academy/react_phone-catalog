import { useContext } from 'react';
import { CartProduct } from '../../../types/products';
import styles from './CartItem.module.scss';
import { CartContext } from '../../../contexts/CartContext';

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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 11.5292 3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 3.26823 3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 3.2689 4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 11.5286C3.2689 11.7889 3.2689 12.211 3.52925 12.4714C3.7896 12.7317 4.21171 12.7317 4.47206 12.4714L8.00065 8.94279L11.5292 12.4714C11.7896 12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 12.211 12.7324 11.7889 12.4721 11.5286L8.94346 7.99998L12.4721 4.47138Z"
              fill="#B4BDC4"
            />
          </svg>
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M2.6665 8.00004C2.6665 7.63185 2.96498 7.33337 3.33317 7.33337H12.6665C13.0347 7.33337 13.3332 7.63185 13.3332 8.00004C13.3332 8.36823 13.0347 8.66671 12.6665 8.66671H3.33317C2.96498 8.66671 2.6665 8.36823 2.6665 8.00004Z"
                fill="#B4BDC4"
              />
            </svg>
          </button>
          {item.quantity}
          <button
            className={styles['quantity-button']}
            onClick={() => handleChangeQuantity(item, '+')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M8.6665 3.33329C8.6665 2.9651 8.36803 2.66663 7.99984 2.66663C7.63165 2.66663 7.33317 2.9651 7.33317 3.33329V7.33329H3.33317C2.96498 7.33329 2.6665 7.63177 2.6665 7.99996C2.6665 8.36815 2.96498 8.66663 3.33317 8.66663H7.33317V12.6666C7.33317 13.0348 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0348 8.6665 12.6666V8.66663H12.6665C13.0347 8.66663 13.3332 8.36815 13.3332 7.99996C13.3332 7.63177 13.0347 7.33329 12.6665 7.33329H8.6665V3.33329Z"
                fill="#313237"
              />
            </svg>
          </button>
        </div>
        <h3 className={styles['item-price']}>${item.price}</h3>
      </div>
    </div>
  );
};
