import React, { useEffect } from 'react';
import { Nav } from '@/shared/components/Nav';
import { HeaderActions } from '../HeaderActions';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

import cn from 'classnames';
import './BurgerMenu.scss';

type Props = {
  isBurgerMenuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ isBurgerMenuOpen }) => {
  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }

    return () => {
      document.body.classList.remove('is-locked');
    };
  }, [isBurgerMenuOpen]);

  return (
    <div
      className={cn('burger-menu', { 'is-open': isBurgerMenuOpen })}
      aria-hidden={!isBurgerMenuOpen}
    >
      <div className="burger-menu__content">
        <Nav />
        <div className="burger-menu__footer">
          <ThemeToggle className="burger-menu__theme-btn" />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
};
