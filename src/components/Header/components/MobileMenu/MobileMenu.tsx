import React, { memo } from 'react';
import { HeaderNav } from '../HeaderNav';
import { UserMenu } from '../UserMenu';
import mobileMenuStyles from './MobileMenu.module.scss';
import classNames from 'classnames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = memo(({ isOpen, onClose }) => {
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
});

MobileMenu.displayName = 'MobileMenu';
