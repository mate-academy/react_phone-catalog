import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { PaginationProviedr } from './PaginationContext';
import classes from './pagination.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
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
      <div {...props} className={cn(classes.pagination, className)}>
        {prevButton}
        {crumbs}
        {nextButton}
      </div>
    </PaginationProviedr>
  );
};
