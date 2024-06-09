import React, { ComponentProps, FC, useMemo } from 'react';
import cn from 'classnames';

import { getFragment } from '../../../helpers/getFragment';
import { RadioGroup } from '../ui/RadioGroup';
import { usePagination } from './PaginationContext';
import classes from './pagination.module.scss';

type Props = ComponentProps<'div'> & {
  take: number;
};

export const PaginationCrumbs: FC<Props> = ({ take, className, ...props }) => {
  const { currentSelectedIndex, pageCount, select } = usePagination();

  const pages = useMemo(
    () => Array.from(Array(pageCount), (_v, index) => index + 1),
    [pageCount],
  );

  return (
    <div {...props} className={cn(classes.pagination__crumbs, className)}>
      <RadioGroup>
        {getFragment(take, currentSelectedIndex, pages).map(value => (
          <RadioGroup.ButtonWithText
            onChange={() => select(value - 1)}
            key={value}
            checked={value === currentSelectedIndex + 1}
          >
            {value}
          </RadioGroup.ButtonWithText>
        ))}
      </RadioGroup>
    </div>
  );
};
