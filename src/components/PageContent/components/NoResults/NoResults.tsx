import React from 'react';
// import { GoHomeButton } from '../buttons/GoHomeButton';

import classes from './NoResults.module.scss';
import { PrimaryButton } from '../../../buttons/PrimaryButton';

type Props = {
  product: string;
};

export const NoResults: React.FC<Props> = ({ product }) => (
  <div className={classes.NoResults}>
    <h1 className={classes.NoResults__title}>{`${product} not found`}</h1>

    <img
      src="img/product-not-found.png"
      className={classes.NoResults__img}
      alt="404"
    />

    <div className={classes.NoResults__button}>
      <PrimaryButton link="/" text="GO HOME" />
    </div>
  </div>
);
