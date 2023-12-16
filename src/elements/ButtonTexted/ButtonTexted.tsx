/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { ProductType } from '../../helpers/types/ProductType';
import { ProductsContext } from '../../store/ProductsContext';
import { isProductCarted } from '../../helpers/utils/checkProductStatus';
import './ButtonTexted.scss';

type Props = {
  product: ProductType;
  text: 'Add to cart' | 'Checkout' | '64 GB' | '256 GB' | '512 GB';
  textActive?: 'Remove from cart'
};

export const ButtonTexted: React.FC<Props> = ({
  product,
  text,
  textActive,
}) => {
  const { cartedProducts, setCartedProducts } = useContext(ProductsContext);

  function handleCartClick(prod: ProductType) {
    if (isProductCarted(cartedProducts, prod)) {
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
        'buttonTexted--active': isProductCarted(cartedProducts, product),
      })}
    >

      <p className={classNames('buttonTexted__text', {
        'buttonTexted__text-active': isProductCarted(cartedProducts, product),
      })}
      >
        {(isProductCarted(cartedProducts, product) && textActive) ? textActive : text}
      </p>
    </button>
  );
};
