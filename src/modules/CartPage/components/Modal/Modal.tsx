import React, { ReactNode } from 'react';
import classes from './Modal.module.scss';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  isOpen: boolean;
};

export const Modal: React.FC<Props> = ({ children, isOpen }) => {
  return (
    <div className={classes.Modal}>
      <div
        className={classNames(classes[`visibility-${isOpen}`], classes.center)}
      >
        {children}
      </div>
    </div>
  );
};
