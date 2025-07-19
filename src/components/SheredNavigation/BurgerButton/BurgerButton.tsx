import React from 'react';
import classNames from 'classnames';

import burgerIcon from '../../../../public/img/icons/burgerMenu.svg';
import closeIcon from '../../../../public/img/icons/closeIcon.svg';
import styles from './BurgerButton.module.scss';

type Props = {
  isOpen: boolean;
  onToggle?: () => void;
  className?: string;
};

export const BurgerButton: React.FC<Props> = ({
  isOpen,
  onToggle,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      className={classNames(styles.button, className)}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <img
        src={isOpen ? closeIcon : burgerIcon}
        alt={isOpen ? 'Close icon' : 'Burger menu icon'}
        className={styles.icon}
      />
    </button>
  );
};
