import { useContext, useEffect, useState } from 'react';
// import { CartAndFavContext } from '../../../../context/CartAndFavContext';
import { Button } from '../../../../common/Button/Button';
import './CartItem.scss';
import { Product } from '../../../../types/types';
import { CartAndFavContext } from '../../../../context/CartAndFavContext';

type Props = {
  product: Product,
};

export const CartItem:React.FC<Props> = ({ product }) => {
  const [count, setCount] = useState(product.count);
  const { cartProducts, setCartProducts } = useContext<any>(CartAndFavContext);

  const deleteProduct = async () => {
    await setCartProducts(cartProducts.filter(
      (p:Product) => p.id !== product.id,
    ));

    if (cartProducts.length === 1) {
      localStorage.setItem('cartProducts', JSON.stringify([]));
    }
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    if (count) {
      if (count <= 0) {
        deleteProduct();

        return;
      }

      setCartProducts(cartProducts.map((p:Product) => {
        if (p.id === product.id) {
          return { ...p, count };
        }

        return p;
      }));
    }
  }, [count]);

  return (
    <div className="cart-item">
      <div className="cart-item__sub-block">
        <Button
          className="no-border cart-item__close"
          image="icons/Close.svg"
          alt="x"
          onClick={deleteProduct}
        />
        <div className="cart-item__picture">
          <img
            src={`new/${product.image}`}
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
              setCount((prev = 1) => prev - 1);
            }}
            image="icons/Minus.svg"
            alt="-"
          />
          <div className="count">
            {product.count}
          </div>
          <Button
            className="plus"
            onClick={() => {
              setCount((prev = 1) => prev + 1);
            }}
            image="icons/Plus.svg"
            alt="+"
          />
        </div>
        <h2 className="cart-item__price">
          $
          { product.count && product.price * product.count}
        </h2>
      </div>
    </div>
  );
};
