import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

import './Button.module.scss';

type Props = {
  defaultText: string;
  toggledText: string;
  isToggled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export const Button: React.FC<Props> = ({
  defaultText,
  toggledText,
  isToggled,
  onClick,
  className,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.toggled]: isToggled },
        className,
      )}
      onClick={onClick}
    >
      {isToggled ? toggledText : defaultText}
    </button>
  );
};
