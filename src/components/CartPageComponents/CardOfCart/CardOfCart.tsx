import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../../../types/ProductsType';
import { CartContext } from '../../../contexts/CartContext';
import { CartType } from '../../../types/CartType';

type Props = {
  product: Product;
  deleteProduct: (el: string) => void;
};

export const CardOfCart: React.FC<Props> = ({ product, deleteProduct }) => {
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const foundLocalProduct: CartType[] = cart.filter(
      (cartProduct: CartType) => cartProduct.itemId === product.itemId,
    );

    const productCount = foundLocalProduct[0].count;
    const priceCount = productCount * product.price;

    setCount(productCount);
    setPrice(priceCount);
  }, [count]);

  const handleMinusButton = () => {
    if (count === 1) {
      return;
    }

    setCount(prev => {
      return prev - 1;
    });

    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.itemId === product.itemId
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem,
      ),
    );
  };

  const handlePlusButton = () => {
    setCount(prev => prev + 1);

    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.itemId === product.itemId
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem,
      ),
    );
  };

  return (
    <div className="card-of-cart">
      <div className="card-of-cart__product-content">
        <button
          className="card-of-cart__delete"
          onClick={() => deleteProduct(product.itemId)}
        >
          <div className="icon icon--close--dark"></div>
        </button>
        <div className="card-of-cart__image-container">
          <img
            src={product.image}
            alt={product.name}
            className="card-of-cart__image"
          />
        </div>
        <div className="card-of-cart__name">{product.name}</div>
      </div>
      <div className="card-of-cart__price-content">
        <div className="card-of-cart__counter-items">
          <div
            // eslint-disable-next-line max-len
            className="card-of-cart__counter-items__button card-of-cart__counter-items__button--minus"
            onClick={() => {
              handleMinusButton();
            }}
          >
            <div className="icon icon--minus"></div>
          </div>
          <div className="card-of-cart__counter-items__count">{count}</div>
          <div
            // eslint-disable-next-line max-len
            className=" card-of-cart__counter-items__button card-of-cart__counter-items__button--plus"
            onClick={() => {
              handlePlusButton();
            }}
          >
            <div className="icon icon--plus"></div>
          </div>
        </div>
        <div className="card-of-cart__price">
          {/* ${product.price ? product.price : product.fullPrice} */}${price}
        </div>
      </div>
    </div>
  );
};
