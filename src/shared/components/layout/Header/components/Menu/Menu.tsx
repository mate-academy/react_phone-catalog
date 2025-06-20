/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';

import { useMenuContext } from '../../../../../../contexts/MenuContext';
import { Icon } from '../../../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../../../shared/components/ui/Icon/IconNames';

import styles from './Menu.module.scss';

export const Menu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isMenuOpen]);

  return (
    <button className={styles.menuControl} type="button" onClick={toggleMenu}>
      {!isMenuOpen ? (
        <Icon name={IconNames.Burger} />
      ) : (
        <Icon className={styles.crossIcon} name={IconNames.Cross} />
      )}
    </button>
  );
};
