import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Container } from '../../../shared/Container';
import { SortSelect } from './SortSelect';
import { TakeSelect } from './TakeSelect';
import classes from './selects.module.scss';

type Props = ComponentProps<typeof Container.Grid>;

export const Selects: FC<Props> = ({ className, ...props }) => {
  return (
    <Container.Grid {...props} className={cn(classes.container, className)}>
      <SortSelect
        className={cn(
          classes.container__select,
          classes.container__select_sort,
        )}
      />
      <TakeSelect
        className={cn(
          classes.container__select,
          classes.container__select_take,
        )}
      />
    </Container.Grid>
  );
};
