/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import { useMenuContext } from '../../../../../../contexts/MenuContext';
import { Icon } from '../../../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../../../shared/components/ui/Icon/IconNames';
import { closeMenu } from '../../../../../../shared/helpers/handlers';

import styles from './UserActions.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon, {
    [styles.linkActive]: isActive,
  });

export const UserActions: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <div
      className={classNames(styles.userActions, {
        [styles.menuOpen]: isMenuOpen,
      })}
    >
      <NavLink
        className={getLinkClass}
        to="/favorites"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <Icon className={styles.iconImage} name={IconNames.Heart} />
      </NavLink>

      <NavLink
        className={getLinkClass}
        to="/cart"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <Icon className={styles.iconImage} name={IconNames.Cart} />
      </NavLink>
    </div>
  );
};
