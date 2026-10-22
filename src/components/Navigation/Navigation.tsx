import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
const cx = classNames.bind(styles);

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Navigation = ({ isOpen, onClose }: Props) => {
  return (
    <div className={cx('overlay', { 'overlay--open': isOpen })}>
      <nav className={cx('nav')}>
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cx('nav__link', { 'nav__link--active': isActive })
            }
            onClick={onClose}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
