import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { RoundButton } from '../ui/RoundButton';
import { Icon } from '../ui/Icon';
import { usePagination } from './PaginationContext';
import classes from './pagination.module.scss';

type Props = ComponentProps<typeof RoundButton>;

export const PaginationNextButton: FC<Props> = ({
  className,
  disabled,
  onClick,
  ...props
}) => {
  const { currentSelectedIndex, pageCount, select } = usePagination();

  const isDisabled = disabled ?? currentSelectedIndex + 1 >= pageCount;
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (typeof onClick === 'function') {
      onClick(e);
    }

    select(currentSelectedIndex + 1);
  };

  return (
    <RoundButton
      {...props}
      disabled={isDisabled}
      className={cn(classes.pagination__button, className)}
      onClick={handleClick}
    >
      <Icon variant="arrow-right" />
    </RoundButton>
  );
};
