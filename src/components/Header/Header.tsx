import classNames from 'classnames/bind';

import { Logo } from '../Ui/Logo';
import { IconButton } from '../Ui/IconButton';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const HEADER_ICONS = [
  {
    name: 'menu',
    src: '/img/icons/Menu.svg',
    toggledSrc: '/img/icons/Close.svg',
    label: 'Menu',
  },
  {
    name: 'favourites',
    src: '/img/icons/Favourites.svg',
    label: 'Favourites',
  },
  {
    name: 'shopping-bag',
    src: '/img/icons/Shopping-bag.svg',
    label: 'Shopping bag',
  },
];

export const Header = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header__logo')}>
        <Logo />
      </div>

      <div className={cx('header__nav')}></div>

      <div className={cx('header__icons-wrapper')}>
        {HEADER_ICONS.map(({ name, src, toggledSrc, label }) => (
          <div
            key={name}
            className={cx('header__icon', `header__icon--${name}`)}
          >
            <IconButton
              src={src}
              toggledSrc={toggledSrc}
              label={label}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </header>
  );
};
