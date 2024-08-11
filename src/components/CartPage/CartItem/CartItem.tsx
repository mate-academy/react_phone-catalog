import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';
import { themeClass } from '../../../utils/themeClass';
import { CartContext } from '../../CartProvider/CartProvider';
import { Product } from '../../../types/Product';
import './CartItem.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  product: Product;
};

export const CartItem: React.FC<Props> = ({
  setPrice,
  product,
  setTotalCount,
}) => {
  const [count, setCount] = useState(1);
  const [prevCount, setPrevCount] = useState(count);
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+e.target.value);
  };

  const minus = () => setCount(prev => prev - 1);

  const plus = () => setCount(prev => prev + 1);

  const handleDelete = () => {
    setCart(cart.filter(a => a !== product));
  };

  useEffect(() => {
    setPrice(prev => prev - product.price * prevCount + product.price * count);
    setTotalCount(prev => prev - prevCount + count);

    setPrevCount(count);
  }, [count]);

  useEffect(() => {
    setCount(1);
    setPrevCount(1);
  }, [cart]);

  return (
    <div className={getClassName('cart-item')}>
      <button
        className={getClassName('cart-item__delete')}
        onClick={handleDelete}
      >
        X
      </button>

      <img
        src={product.image}
        alt=""
        className={getClassName('cart-item__pic')}
      />

      <p
        className={getClassName('cart-item__title')}
        onClick={() => navigate(`/${product.category}/${product.itemId}`)}
      >
        {product.name}
      </p>

      <div className={getClassName('cart-item__counter')}>
        <button
          className={getClassName('cart-item__counter--button')}
          onClick={minus}
          disabled={count < 2}
        >
          -
        </button>
        <input
          type="number"
          className={getClassName('cart-item__counter--input')}
          onChange={handleInputChange}
          value={count}
        />
        <button
          className={getClassName('cart-item__counter--button')}
          onClick={plus}
        >
          +
        </button>
      </div>

      <p className={getClassName('cart-item__price')}>{`$${product.price}`}</p>
    </div>
  );
};
