import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Nav.styles.module.scss';
import React from 'react';

type Props = {
  variant: 'desktop' | 'mobile';
  onLinkClick?: () => void;
};

const links = [
  { to: '/', label: 'HOME' },
  { to: '/phones', label: 'PHONES' },
  { to: '/tablets', label: 'TABLETS' },
  { to: '/accessories', label: 'ACCESSORIES' },
];

export const Nav: React.FC<Props> = ({ variant, onLinkClick }) => {
  return (
    <nav className={classNames(styles.nav, styles[variant])} role="navigation">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onLinkClick}
          className={({ isActive }) =>
            classNames(styles.link, {
              [styles.active]: isActive,
            })
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
