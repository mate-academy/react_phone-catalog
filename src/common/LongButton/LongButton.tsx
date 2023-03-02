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

type Props = {
  text: string,
  link?: string,
  className?: string,
  product?: Product,
  products?: Product[],
  onClick?: () => void,
};

export const LongButton:React.FC<Props> = ({
  text,
  link = '/',
  onClick,
  className = '',
  product,
  products,
}) => {
  let singleProduct = product;
  const ref = useRef<HTMLAnchorElement>(null);
  const { detailedProduct } = useContext(DetailedProductContext);

  const {
    cartProducts, setCartProducts,
  } = useContext(CartAndFavContext) ?? {};

  const addToCart = async (
    event: { preventDefault: () => void; },
  ) => {
    if (products) {
      singleProduct = products.find((one: Product) => {
        return one.phoneId === detailedProduct.id;
      });
    }

    event.preventDefault();
    if (!cartProducts || !setCartProducts || !singleProduct) {
      return;
    }

    const exists = cartProducts.find((one) => {
      if (singleProduct && one.id === singleProduct.id) {
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
      href={link || '/'}
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
