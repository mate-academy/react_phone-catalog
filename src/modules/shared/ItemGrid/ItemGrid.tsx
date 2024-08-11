import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import cn from 'classnames';

import { Container } from '../Container';
import classes from './itemGrid.module.scss';

type Props = ComponentPropsWithoutRef<typeof Container.Grid> & {
  items: ReactNode[];
};

export const ItemGrid: FC<Props> = ({ items, className, ...props }) => {
  return (
    <Container.Grid {...props} className={cn(classes.grid, className)}>
      {items.map((item, key) => (
        <div className={classes.grid__item} key={key}>
          {item}
        </div>
      ))}
    </Container.Grid>
  );
};
