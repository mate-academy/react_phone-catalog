import React from 'react';
import { useLocalStorage } from '../LocaleStorage';
import { Products } from '../types/products';

export const CartItem = () => {
  const [cart, setCart] = useLocalStorage<Products[]>('cart', []);

  const sumCart = () => {
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price
    }

    return sum
  }

  const handleRemoveItem = (productId: number) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <>
      <div className='details__back'>
        <img src="./img/Icons_Chevron (Arrow Right).svg" alt="Home" />
        <p className='details__back--text'>Back</p>
      </div>

      <h1>Cart</h1>
      <p>{cart.length} items</p>

      {cart.map(el => (
        <div className='cart__card'>
          <div style={{display: 'flex', alignItems: 'center', columnGap: '16px'}}>
            <img onClick={() => handleRemoveItem(el.id)} className='cart__card-close' src="./img/Icons_Close.png" />
            <img className='cart__card-img' src={el.image} alt="" />
            <p>{el.name}</p>
          </div>
          <p className='cart__card-price'>${el.price}</p>
        </div>
      ))}


      <div className='cart__checkout'>
        <h2 className='cart__text'>{`$${sumCart()}`}</h2>
        <p>Total for 0 items</p>
        <div className='cart__line'></div>
        <button className="card__buy-cart">Checkout</button>
      </div>
    </>
  )
};
