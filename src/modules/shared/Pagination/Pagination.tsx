import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Container } from '../Container';
import { PaginationProviedr } from './PaginationContext';
import classes from './pagination.module.scss';

type Props = ComponentProps<typeof Container> & {
  pageCount: number;
  currentSelectedIndex: number;
  select: (index: number) => void;
  nextButton?: React.ReactNode;
  prevButton?: React.ReactNode;
  crumbs?: React.ReactNode;
};

export const Pagination: FC<Props> = ({
  className,
  pageCount,
  nextButton,
  prevButton,
  select,
  currentSelectedIndex,
  crumbs,
  ...props
}) => {
  return (
    <PaginationProviedr
      pageCount={pageCount}
      select={select}
      currentSelectedIndex={currentSelectedIndex}
    >
      <Container {...props} className={cn(classes.pagination, className)}>
        {prevButton}
        {crumbs}
        {nextButton}
      </Container>
    </PaginationProviedr>
  );
};
