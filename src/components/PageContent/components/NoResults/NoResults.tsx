import React from 'react';
// import { GoHomeButton } from '../buttons/GoHomeButton';

import classes from './NoResults.module.scss';

type Props = {
  product: string;
};

export const NoResults: React.FC<Props> = ({ product }) => (
  <div className={classes.NoResults}>
    <h2 className={classes.NoResults__title}>{`${product} not found`}</h2>

    {/* <GoHomeButton /> */}
  </div>
);
