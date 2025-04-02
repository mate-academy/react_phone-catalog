import React from 'react';
import { HeaderNav } from '../HeaderNav';
import { UserMenu } from '../UserMenu';
import mobileMenuStyles from './MobileMenu.module.scss';
import classNames from 'classnames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={classNames(mobileMenuStyles.mobileMenu, {
        [mobileMenuStyles['mobileMenu--open']]: isOpen,
      })}
    >
      <HeaderNav onClose={onClose} />
      <UserMenu onClose={onClose} />
    </aside>
  );
};
