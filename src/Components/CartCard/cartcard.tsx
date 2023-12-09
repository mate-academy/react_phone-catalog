// CartCard.jsx
import React, { useState, useEffect } from 'react';
import Close from './Close.svg';
import Minus from './Minus.svg';
import Plus from './Plus.svg';
import { useCartContext } from '../cartcontext/cartcontext';
import './cartcard.scss';

const CartCard = ({ productId }) => {
  const { cartProducts, addToCart, removeFromCart } = useCartContext();
  const [product, setProduct] = useState(null);

  const getCounterForProduct = () => {
    const cartProduct = cartProducts.find((product) => product.id === productId);
    return cartProduct ? cartProduct.quantity : 0;
  };

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item) => item.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error(`Product with ID ${productId} not found.`);
        }
      })
      .catch((error) => console.error('Error fetching product list:', error));
  }, [productId]);

  if (!product) {
    return null;
  }

  const handleRemoveFromCartClick = () => {
    removeFromCart(productId);
  };

  const handleAddClick = () => {
    addToCart(productId);
  };

  const handleRemoveClick = () => {
    if (getCounterForProduct() > 1) {
      removeFromCart(productId);
    }
  };

  const totalprice = () => {
    return product.price * getCounterForProduct() + '$';
  };

  return (
    <div className="cart-card">
      <button className='x' onClick={handleRemoveFromCartClick}>
        <img src={Close} alt="close"/>
      </button>
      <img src={product.imageUrl} className="img" alt={product.name} />
      <div className='name'>{product.name}</div>
      <div className='buttons-holder1'>
        <button className='plusminus' onClick={handleRemoveClick}>
          <img src={Minus} className='' alt='minus' />
        </button>
        <div>{getCounterForProduct()}</div>
        <button className='plusminus' onClick={handleAddClick}>
          <img src={Plus} className='' alt='plus' />
        </button>
      </div>
      <div className='totalprice'>{totalprice()}</div>
    </div>
  );
};

export default CartCard;
