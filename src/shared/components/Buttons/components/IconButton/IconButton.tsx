import React from 'react';

import cn from 'classnames';
import './IconButton.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const IconButton: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button type="button" className={cn('icon-button', className)} {...props}>
      {children}
    </button>
  );
};
