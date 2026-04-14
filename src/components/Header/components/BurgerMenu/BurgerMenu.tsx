import React, { useEffect } from 'react';
import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { Navigation } from '../Navigation';
import { Actions } from '../Actions';
import { ThemeToggler } from '../ThemeToggler';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  favCount: number;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose, cartCount, favCount }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={classNames(styles.menu, { [styles.isOpen]: isOpen })}>
      <div className={styles.content}>
        <Navigation onClose={onClose} className={styles.burgerNav} />

        <div className={styles.togglerWrapper}>
          <span className="small-text">Appearance</span>
          <ThemeToggler />
        </div>

        <Actions
          cartCount={cartCount}
          favCount={favCount}
          onClose={onClose}
          className={styles.burgerActions}
        />
      </div>
    </div>
  );
};
