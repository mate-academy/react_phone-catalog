import React from 'react';
import { HeaderNav } from '../Header/HeaderNav';
import { UserMenu } from '../Header/UserMenu';
import mobileMenuStyles from './MobileMenu.module.scss';
import classNames from 'classnames';

type Props = {
  isMenuOpen: boolean;
};

export const MobileMenu: React.FC<Props> = ({ isMenuOpen }) => {
  return (
    <aside
      className={classNames(mobileMenuStyles.mobileMenu, {
        [mobileMenuStyles['mobileMenu--open']]: isMenuOpen,
      })}
    >
      <HeaderNav />
      <UserMenu />
    </aside>
  );
};
