import { useContext, useEffect, useState } from 'react';
import { CartAndFavContext } from '../../../../context/CartAndFavContext';
import { Button } from '../../../../helpers/Button/Button';
import './CartItem.scss';

export const CartItem = ({ product }) => {
  const [count, setCount] = useState(product.count);
  const { cartProducts, setCartProducts } = useContext(CartAndFavContext);

  const deleteProduct = async () => {
    // const productsList = );

    await setCartProducts(cartProducts.filter((p) => p.id !== product.id));
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    if (count <= 0) {
      deleteProduct();

      return;
    }

    setCartProducts(cartProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, count };
      }

      return p;
    }));
  }, [count]);

  // const phonesAmount = localStorage.getItem('count');

  // console.log(phonesAmount);

  return (
    <div className="cart-item">
      <div className="cart-item__sub-block">
        <Button
          className="no-border cart-item__close"
          image="/icons/Close.svg"
          alt="x"
          onClick={deleteProduct}
        />
        <div className="cart-item__picture">
          <img
            src={`_new/${product.image}`}
            alt={product.itemId}
            className="cart-item__image"
          />
        </div>
        <p className="cart-item__title body14">
          {product.name}
        </p>
      </div>
      <div className="cart-item__sub-block">
        <div className="cart-item__count">
          <Button
            className="minus"
            onClick={() => {
              setCount(prev => prev - 1);
            }}
            image="/icons/Minus.svg"
            alt="-"
          />
          <div className="count">
            {product.count}
          </div>
          <Button
            className="plus"
            onClick={() => {
              setCount(prev => prev + 1);
            }}
            // onClick={moveRight}
            image="/icons/Plus.svg"
            alt="+"
          />
        </div>
        <h2 className="cart-item__price">
          $
          {product.price * product.count}
        </h2>
      </div>
    </div>
  );
};
