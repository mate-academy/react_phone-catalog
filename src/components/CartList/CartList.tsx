import React from 'react';
import './CartList.scss';
import { CartObjType } from '../../helpers/types/CartObjType';
import { CartItem } from '../CartItem';

type Props = {
  productsInCart: CartObjType;
};

export const CartList: React.FC<Props> = ({ productsInCart }) => {
  const productsArr = Object.keys(productsInCart);

  const deleteFromCart = (id: string) => {
    const newProductsInCart = Object.assign(productsInCart);

    delete newProductsInCart[id];

    localStorage.setItem('cart', JSON.stringify(newProductsInCart));

    window.dispatchEvent(new Event('storage'));
  };

  const changQuantity = (isIncrease: boolean, id: string) => {
    const newProductsInCart = Object.assign(productsInCart);
    let newQuantity = newProductsInCart[id].quantity;

    if (isIncrease) {
      newQuantity += 1;
    } else if (newQuantity > 1) {
      newQuantity -= 1;
    }

    newProductsInCart[id].quantity = newQuantity;

    localStorage.setItem('cart', JSON.stringify(newProductsInCart));

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="cart-list">
      {productsArr.map(productId => (
        <CartItem
          key={productId}
          productData={productsInCart[productId]}
          deleteFromCart={deleteFromCart}
          changQuantity={changQuantity}
        />
      ))}
    </div>
  );
};
