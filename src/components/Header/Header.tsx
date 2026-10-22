import classNames from 'classnames/bind';

import { Logo } from '../Ui/Logo';
import { IconButton } from '../Ui/IconButton';
import { Navigation } from '../Navigation';

import styles from './Header.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuIconClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const HEADER_ICONS = [
    {
      name: 'menu',
      src: '/img/icons/Menu.svg',
      toggledSrc: '/img/icons/Close.svg',
      label: 'Menu',
      onclick: handleMenuIconClick,
    },
    {
      name: 'favourites',
      src: '/img/icons/Favourites.svg',
      label: 'Favourites',
      onclick: () => {},
    },
    {
      name: 'shopping-bag',
      src: '/img/icons/Shopping-bag.svg',
      label: 'Shopping bag',
      onclick: () => {},
    },
  ];

  return (
    <header className={cx('header')}>
      <div className={cx('header__nav-wrapper')}>
        <div className={cx('header__logo')}>
          <Logo />
        </div>
        <Navigation isOpen={isMenuOpen} onClose={handleMenuIconClick} />
      </div>

      <div className={cx('header__icons-wrapper')}>
        {HEADER_ICONS.map(({ name, src, toggledSrc, label, onclick }) => (
          <div
            key={name}
            className={cx('header__icon', `header__icon--${name}`)}
          >
            <IconButton
              src={src}
              toggledSrc={toggledSrc}
              label={label}
              onClick={onclick}
              toggled={name === 'menu' ? isMenuOpen : false}
            />
          </div>
        ))}
      </div>
    </header>
  );
};
