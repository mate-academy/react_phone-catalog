import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Price } from '../../modules/shared/Price';
import { Products } from '../../types/products';
import { Specs } from '../Specs';
import { Button } from '../../modules/shared/Button';

import style from './ProductsCart.module.scss';

type Props = {
  product: Products;
  modifier?: string;
  discount?: boolean;
};

export const ProductsCart: React.FC<Props> = ({
  product,
  modifier,
  discount,
}) => {
  const { screen, capacity, ram } = product;

  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Capacity', value: capacity },
    { name: 'Ram', value: ram },
  ];

  return (
    <div
      className={cn(style['products-cart'], {
        [style[`products-cart--${modifier}`]]: modifier,
      })}
    >
      <Link
        className={style['products-cart__link']}
        to={`/${product.category}/${product.itemId}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div
          className={cn(style['products-cart__images'], {
            [style[`products-cart__images--${modifier}`]]: modifier,
          })}
        >
          <div
            style={{ backgroundImage: `url(${product.image})` }}
            className={style['products-cart__icon']}
          ></div>
        </div>
        <p className={style['products-cart__name']}>{product.name}</p>
      </Link>

      <Price
        fullPrice={product.fullPrice}
        newPrice={product.price}
        discountPrice={discount}
      />

      <div className={style['products-cart__info']}>
        {specs.map(spec => (
          <Specs key={spec.name} specs={spec} modifier="cart" />
        ))}
      </div>

      <Button productId={product.itemId} />
    </div>
  );
};
