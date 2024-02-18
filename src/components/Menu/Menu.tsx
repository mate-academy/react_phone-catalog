import React, { useEffect, useRef } from 'react';
import { CART, FAVORITES } from '../../helpers/constants';
import { ActionLink } from '../ActionLink';
import { Navigation } from '../Navigation';
import './Menu.scss';

type Props = {
  isMenuVisible: boolean;
};

export const Menu: React.FC<Props> = ({ isMenuVisible }) => {
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const menuElement = menuRef.current;

    if (menuElement) {
      if (isMenuVisible) {
        menuElement.classList.add('menu--visible');
      } else {
        menuElement.classList.remove('menu--visible');
      }
    }
  }, [isMenuVisible]);

  return (
    <nav className="menu" ref={menuRef}>
      <Navigation />

      <div className="menu__actions">
        <ActionLink action={FAVORITES} />
        <ActionLink action={CART} />
      </div>
    </nav>
  );
};
