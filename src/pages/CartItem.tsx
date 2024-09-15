import React from 'react';

export const CartItem = () => {
  return (
    <>

      <div className='details__back'>
        <img src="./img/Icons_Chevron (Arrow Right).svg" alt="Home" />
        <p className='details__back--text'>Back</p>
      </div>

      <h1>Cart</h1>
      <p>0 items</p>

      <div className='cart__checkout'>
        <h2 className='cart__text'>$0</h2>
        <p>Total for 0 items</p>
        <div className='cart__line'></div>
        <button className="card__buy-cart">Checkout</button>
      </div>
    </>
  )
};
