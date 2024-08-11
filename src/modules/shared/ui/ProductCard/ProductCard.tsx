import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';
import cn from 'classnames';

import { Product } from '../../../../types';
import { ProductCardProvider } from './ProductCardContext';
import classes from './productCard.module.scss';

type Props = ComponentPropsWithoutRef<'article'> & {
  product: Product;
  to: To;
  actions?: ReactNode;
  name?: ReactNode;
  price?: ReactNode;
  image?: ReactNode;
  specs?: ReactNode;
};

export const ProductCard: FC<Props> = ({
  product,
  actions,
  to,
  name,
  price,
  specs,
  image,
  className,
  ...props
}) => {
  return (
    <ProductCardProvider product={product}>
      <article {...props} className={cn(classes.card, className)}>
        {image && (
          <Link to={to} className={classes.card__imgLink}>
            {image}
          </Link>
        )}
        {name && (
          <Link to={to} className={classes.card__nameLink}>
            {name}
          </Link>
        )}
        {price}
        {specs}
        {actions}
      </article>
    </ProductCardProvider>
  );
};
