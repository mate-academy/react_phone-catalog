import React from 'react';
import { PurchaseNavButtons } from '../Elements/PurchaseNavButtons';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
import './MobileMenu.scss';
import classNames from 'classnames';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, handleClose }) => {
  return (
    <aside
      className={classNames('menu', {
        'menu--open': isOpen,
      })}
    >
      <div className="menu__top">
        <Logo />
        <button className="button-square" onClick={handleClose}>
          <div className="icon icon--close"></div>
        </button>
      </div>
      <Navigation className="menu__nav" handleClick={handleClose} />
      <PurchaseNavButtons className="menu__buttons" />
    </aside>
  );
};
