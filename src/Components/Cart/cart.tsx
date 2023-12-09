// Cart.jsx
import React, { useState, useEffect } from 'react';
import CartCard from '../CartCard/cartcard';
import useProducts from '../useproducts/useProducts';
import chevronleft from './Chevron-left.svg';
import { Link } from 'react-router-dom';
import { useCartContext } from '../cartcontext/cartcontext';
import './cart.scss';

const Cart = () => {
  const { cartProducts, removeFromCart } = useCartContext();
  const [total, setTotal] = useState(0);
  const products = useProducts();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const calculateTotal = () => {
    const calculatedTotal = cartProducts.reduce((acc, { id, quantity }) => {
      const foundProduct = products.find((item) => item.id === id);

      if (foundProduct) {
        acc += foundProduct.price * quantity;
      } else {
        console.error(`Product with ID ${id} not found.`);
      }

      return acc;
    }, 0);

    setTotal(calculatedTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartProducts, products]);

  return (
    <div className='product-div'>
      <div className='page-back__holder'>
        <img src={chevronleft} alt="Chevron" className='folder-chevron' />
        <Link className='page-back' to="/">Back</Link>
      </div>
      <h3 className='title'>Cart</h3>
      <div className='cart-holder'>
      <div className='cart-cards'>
      {cartProducts.map(({ id }) => (
        <CartCard
          key={id}
          productId={id}
          onRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      </div>
      <div className='total'>
        <div className='total-money'>${total.toFixed(2)}</div>
        <div className='total-total'>Total for your items</div>

        <div className='line total'></div>
        <button className='checkout'>Checkout</button>
        </div>
        </div>
    </div>
  );
};

export default Cart;
