import React from 'react';
import clsx from 'clsx';

import './Burger.scss';

type Props = {
  isOpenedMenu: boolean;
  openMenu: () => void;
};

export const Burger: React.FC<Props> = ({ isOpenedMenu, openMenu }) => {
  return (
    <div
      className={clsx('header__burger burger', isOpenedMenu && 'active')}
      onClick={openMenu}
      role="button"
      onKeyDown={openMenu}
      tabIndex={0}
      aria-label="menu"
    >
      <span className="burger__line" />
    </div>
  );
};
