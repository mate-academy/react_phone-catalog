import { useState } from 'react';
import styles from './Cart.module.scss'
import { Phone } from '../../../Types/type';

interface CartProps {
  itemsInCart: Phone[];
  toggleFavourite: (product: Phone) => void;

}

export const Cart = ({ itemsInCart, toggleFavourite }: CartProps) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = currentQty + delta;
      
      if (newQty < 1) return prev; 
      return { ...prev, [productId]: newQty };
    });
  };

  const totalPrice = itemsInCart.reduce((sum, product) => {
    const qty = quantities[product.id] || 1;
    const price = product.priceDiscount || product.priceRegular;
    return sum + (price * qty);
  }, 0);

  const totalItems = itemsInCart.reduce((sum, product) => {
    return sum + (quantities[product.id] || 1);
  }, 0);

  return (
    <>
      <div className={styles.cartpage}>
        <div className={styles.cartpage__cart}>
          {itemsInCart.map((product: Phone) => {
            const price = product.priceDiscount || product.priceRegular; 
            const quantity = quantities[product.id] || 1;

            return (
              <div className={styles.cartpage__cart__item} key={product.id}>
                <button
                className={styles.cartpage__cart__item__delete}
                onClick={() => toggleFavourite(product)}
                ></button>
                <img src={product.images[0]} className={styles.cartpage__cart__item__image} alt={product.name} />
                <p className={styles.cartpage__cart__item__id}>{product.id}</p>
                <div className={styles.cartpage__cart__item__quantity}>
                  <button
                    className={styles.cartpage__cart__item__quantity__operator}
                    onClick={() => updateQuantity(product.id, -1)}
                  >-</button>
                  <p className={styles.cartpage__cart__item__quantity__number}>{quantity}</p>
                  <button
                    className={styles.cartpage__cart__item__quantity__operator}
                    onClick={() => updateQuantity(product.id, 1)}
                  >+</button>
                </div>
                <p className={styles.cartpage__cart__item__price}>${price * quantity}</p>
              </div>
            )
          })}
        </div>
        
        <div className={styles.cartpage__cart__bucket}>
          <p className={styles.cartpage__cart__bucket__totalprice}>${totalPrice}</p>
          <p className={styles.cartpage__cart__bucket__quantity}>Total for {totalItems} items</p>
          <span className={styles.cartpage__cart__bucket__line}></span>
          <button className={styles.cartpage__cart__bucket__submit}>Checkout</button>
        </div>
      </div>
    </>
  )
}