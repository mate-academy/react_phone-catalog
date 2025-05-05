import React, { memo } from 'react';
import actionButtonStyles from './ActionButton.module.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const ActionButton: React.FC<Props> = memo(
  ({ className, children, onClick = () => {} }) => {
    return (
      <button
        className={classNames(className, actionButtonStyles.actionButton)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);

ActionButton.displayName = 'ActionButton';
