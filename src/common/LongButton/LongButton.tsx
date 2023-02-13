/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
import {
  useEffect, useContext, useRef,
} from 'react';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import { Product } from '../../types/types';
import './LongButton.scss';

export const LongButton = ({
  text, onClick, className, product, products,
}: any) => {
  let singleProduct = product;
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
      singleProduct = products.find((one: Product) => {
        return one.phoneId === detailedProduct.id;
      });
    }

    event.preventDefault();
    const exists = cartProducts.find((one: any) => {
      if (one.id === singleProduct.id) {
        return one.id === singleProduct.id;
      }

      return;
    });

    if (exists) {
      return;
    }

    await setCartProducts([...cartProducts, { ...singleProduct, count: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <a
      className={`long-button__link body14 ${className}`}
      href="/"
      ref={ref}
      onClick={
        text.includes('cart')
          ? addToCart
          : onClick
      }
    >
      {text}
    </a>
  );
};
