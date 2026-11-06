import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingBag } from 'react-icons/lu';
import classNames from 'classnames';

import { useStateContext } from '../../hooks/useStateContext';

import { BurgerMenu } from '../BurgerMenu';

import styles from './ActionLinks.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.actions__link, {
    [styles.active]: isActive,
  });

const NAV_LINKS: NavLinkItem[] = [
  { path: '/favorites', icon: FaRegHeart, label: 'favorites' },
  { path: '/cart', icon: LuShoppingBag, label: 'cart' },
];

type NavLinkItem = {
  path: string;
  icon: IconType;
  label: string;
};

type Props = {
  actionState?: 'header' | 'sidebar';
};

export const ActionLinks: React.FC<Props> = ({ actionState = 'header' }) => {
  const { setIsMenuOpen } = useStateContext();

  return (
    <div
      className={classNames(styles.actions, styles[`actions--${actionState}`])}
    >
      {NAV_LINKS.map(({ path, icon: Icon, label }) => (
        <NavLink
          to={path}
          key={path}
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
          aria-label={label}
        >
          <Icon className={styles['actions__action-icon']} />
        </NavLink>
      ))}

      {actionState === 'header' && (
        <div className={styles['actions__burger-menu']}>
          <BurgerMenu onClick={() => setIsMenuOpen(true)} />
        </div>
      )}
    </div>
  );
};
