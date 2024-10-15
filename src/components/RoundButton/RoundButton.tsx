import cn from 'classnames';
import React from 'react';

import styles from './RoundButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const RoundButton: React.FC<Props> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button className={cn(className, styles['round-button'])} {...rest}>
      {children}
    </button>
  );
};
