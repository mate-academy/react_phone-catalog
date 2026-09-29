import React from 'react';

import cn from 'classnames';
import './DropdownSelectSkeleton.scss';

type Props = {
  className?: string;
};

export const DropdownSelectSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('dropdown-select-skeleton', className)}>
      <div className="dropdown-select-skeleton__label" />
      <div className="dropdown-select-skeleton__trigger" />
    </div>
  );
};
