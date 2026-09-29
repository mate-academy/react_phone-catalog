import React from 'react';

import cn from 'classnames';
import './Burger.scss';

type Props = {
  onOpenChange: (target: boolean) => void;
  isOpen: boolean;
  className?: string;
  hasItems: boolean;
};

export const Burger: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  className,
  hasItems,
}) => {
  return (
    <button
      className={cn('burger', className)}
      type="button"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      onClick={() => onOpenChange(!isOpen)}
    >
      <span className="burger__line"></span>
      {hasItems && <span className="burger__badge"></span>}
    </button>
  );
};
