import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { IconLinkButton } from '../Ui/IconLinkButton';
import { ACTION_ICONS } from '../../constants/actionIcons';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

type Props = {
  isOpen: boolean;
};

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Navigation = ({ isOpen }: Props) => (
  <div className={cx('overlay', { 'overlay--open': isOpen })}>
    <nav className={cx('nav')}>
      {navLinks.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cx('nav__link', { 'nav__link--active': isActive })
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>

    <div className={cx('nav__footer')}>
      {ACTION_ICONS.map(({ name, src, label, to }) => (
        <IconLinkButton
          key={name}
          to={to}
          src={src}
          label={label}
          className={cx('nav__footer-item')}
        />
      ))}
    </div>
  </div>
);
