/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { useMenuContext } from '../../../../../../contexts/MenuContext';
import { Icon } from '../../../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../../../shared/components/ui/Icon/IconNames';

import styles from './Menu.module.scss';

export const Menu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

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
