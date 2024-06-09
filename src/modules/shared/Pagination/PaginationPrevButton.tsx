import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { RoundButton } from '../ui/RoundButton';
import { Icon } from '../ui/Icon';
import { usePagination } from './PaginationContext';
import classes from './pagination.module.scss';

type Props = ComponentProps<typeof RoundButton>;

export const PaginationPrevButton: FC<Props> = ({
  className,
  disabled,
  onClick,
  ...props
}) => {
  const { currentSelectedIndex, select } = usePagination();

  const isDisabled = disabled ?? currentSelectedIndex <= 0;
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (typeof onClick === 'function') {
      onClick(e);
    }

    select(currentSelectedIndex - 1);
  };

  return (
    <RoundButton
      {...props}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(classes.pagination__button, className)}
    >
      <Icon variant="arrow-left" />
    </RoundButton>
  );
};
