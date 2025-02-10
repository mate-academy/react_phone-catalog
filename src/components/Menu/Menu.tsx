import classNames from 'classnames';
import styles from './Menu.module.scss';
import '../../index.scss';
import React from 'react';
import { Nav } from '../Nav';
import { CartAndFavouritesButtons } from '../CartAndFavouritesButtons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={classNames(styles.menu, 'page__menu', {
        open: isOpen,
      })}
    >
      <Nav variant="menu" onLinkClick={onClose} />

      <CartAndFavouritesButtons variant="menu" onLinkClick={onClose} />
    </aside>
  );
};
