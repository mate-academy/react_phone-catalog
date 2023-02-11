import {
  useEffect, useContext, useRef, useState,
} from 'react';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { DetailedProductContext } from '../../context/DetailedProductContext';
// import { DetailedProductContext } from '../../context/DetailedProductContext';
import './LongButton.scss';

export const LongButton = ({
  text, onClick, className, product, products,
}: any) => {
  const ref = useRef<any>(null);
  const {
    detailedProduct,
  } = useContext<any>(DetailedProductContext);

  const {
    cartProducts, setCartProducts,
  } = useContext<any>(CartAndFavContext);

  const addToCart = async (
    event: any,
  ) => {
    if (products) {
      product = products.find((one) => {
        return one.phoneId === detailedProduct.id;
      });
    }

    event.preventDefault();
    const exists = cartProducts.find((one: any) => {
      if (one.id === product.id) {
        return one.id === product.id;
      }
    });

    if (exists) {
      return;
    }

    await setCartProducts([...cartProducts, { ...product, count: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <a
      className={`long-button__link body14 ${className}`}
      href="/"
      ref={ref}
      onClick={(event) => {
        text.includes('cart')
          ? addToCart(event)
          : onClick;
      }}
    >
      {text}
    </a>
  );
};
