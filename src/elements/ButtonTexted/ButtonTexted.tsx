/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { ProductType } from '../../helpers/types/ProductType';
import { ProductsContext } from '../../store/ProductsContext';
import './ButtonTexted.scss';

type Props = {
  product: ProductType;
  text: 'Add to cart' | 'Checkout' | '64 GB' | '256 GB' | '512 GB';
  textActive?: 'Added to cart'
  width?: string;
};

export const ButtonTexted: React.FC<Props> = ({
  product,
  text,
  textActive,
  width,
}) => {
  const { cartedProducts, setCartedProducts } = useContext(ProductsContext);

  function isProductCarted() {
    const copy = [...cartedProducts];

    return copy.map(car => JSON.stringify(car))
      .includes(JSON.stringify(product));
  }

  function handleCartClick(prod: ProductType) {
    if (isProductCarted()) {
      setCartedProducts(cur => cur.filter(item => item !== prod));
    } else {
      setCartedProducts(cur => [...cur, prod]);
    }
  }

  return (
    <button
      type="button"
      aria-label="button"
      onClick={() => handleCartClick(product)}
      className={classNames('buttonTexted', {
        'buttonTexted--active': isProductCarted(),
        [`buttonTexted--${width}`]: width,
      })}
    >

      <p className={classNames('buttonTexted__text', {
        'buttonTexted__text-active': isProductCarted(),
      })}
      >
        {(isProductCarted() && textActive) ? textActive : text}
      </p>
    </button>
  );
};
