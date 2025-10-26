import React from "react";
import { CartItemType, useCart } from "../../../contexts";
import { Button } from "../../shared";
import { Icon } from "../../shared/components/Icon/Icon";

import styles from "./CartItem.module.scss";

export const CartItem: React.FC<{ item: CartItemType }> = ({ item: { product, quantity } }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  return (
    <li className={styles['cart-item']}>
      <div className={styles['cart-item__product']}>
        <Button variant="icon" noBorder onClick={() => removeFromCart(product.itemId)}>
          <Icon name="close" />
        </Button>
        <img src={product.image} alt={product.name} className={styles['cart-item__image']} />
        <h4 className={styles['cart-item__title']}>{product.name}</h4>
      </div>
      <div className={styles['cart-item__details']}>
        <div className={styles['cart-item__qty-controls']}>
          <Button variant="icon" size="sm" disabled={quantity === 1} onClick={() => decrementQuantity(product.itemId)}>
            <Icon name="minus" />
          </Button>
          <span className={styles['cart-item__count']}>{quantity}</span>
          <Button variant="icon" size="sm" onClick={() => incrementQuantity(product.itemId)}>
            <Icon name="plus" />
          </Button>
        </div>
        <span className={styles['cart-item__price']}>{quantity * product.price}$</span>
      </div>
    </li>
  );
};
