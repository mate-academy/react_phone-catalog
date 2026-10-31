import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { MENU_HASH } from '../../../hooks/useBurgerMenu';

import styles from './BurgerButton.module.scss';

interface Props {
  isOpen: boolean;
  className?: string;
}

const cx = classNames.bind(styles);

const MENU_ICON = '/img/icons/Menu.svg';
const CLOSE_ICON = '/img/icons/Close.svg';

export const BurgerButton: React.FC<Props> = ({ isOpen, className }) => {
  const { pathname, search } = useLocation();
  const label = isOpen ? 'Close menu' : 'Open menu';

  return (
    <Link
      to={{ pathname, search, hash: isOpen ? '' : MENU_HASH }}
      replace={isOpen} // закриття не додає запис в історію
      aria-label={label}
      aria-expanded={isOpen}
      title={label}
      className={cx('burger', className)}
    >
      <img
        src={isOpen ? CLOSE_ICON : MENU_ICON}
        alt=""
        className={cx('burger__icon')}
      />
    </Link>
  );
};
