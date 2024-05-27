import React, { ReactNode } from 'react';
import classNames from 'classnames';

import classes from './MoveButton.module.scss';

type Props = {
  active?: boolean;
  big?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const MoveButton: React.FC<Props> = ({
  children,
  active = true,
  big = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(classes.MoveButton, {
        [classes['MoveButton--big']]: big,
      })}
      disabled={!active}
    >
      {children}
    </button>
  );
};
