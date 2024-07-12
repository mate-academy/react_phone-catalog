import React from 'react';
import classes from './Details.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import { addSpaceInText } from '../../../../shared/workWithString';

type Props = {
  product: ProductDetails;
};
export const Details: React.FC<Props> = ({ product }) => {
  return (
    <div className={classes.Details}>
      <div className={classes.Details__content}>
        <p>Screen</p>
        <p>{addSpaceInText(product.screen)}</p>
      </div>
      <div className={classes.Details__content}>
        <p>Resolution</p>
        <p>{addSpaceInText(product.resolution)}</p>
      </div>
      <div className={classes.Details__content}>
        <p>Processor</p>
        <p>{addSpaceInText(product.processor)}</p>
      </div>
      <div className={classes.Details__content}>
        <p>RAM</p>
        <p>{addSpaceInText(product.ram)}</p>
      </div>
    </div>
  );
};
