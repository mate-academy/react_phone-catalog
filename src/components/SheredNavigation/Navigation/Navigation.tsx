import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.module.scss';

type NavItem = {
  label: string;
  path: string;
  external?: boolean;
};

type Props = {
  links: NavItem[];
  view: 'header' | 'mobile' | 'footer';
  onLinkClick?: () => void;
};

export const Navigation: React.FC<Props> = ({ links, view, onLinkClick }) => {
  return (
    <nav className={classNames(styles.nav, styles[`nav--${view}`])}>
      {links.map(({ label, path, external }) => {
        const commonClass = classNames(styles.link, styles[`link--${view}`]);

        if (external) {
          return (
            <a
              key={path}
              href={path}
              className={commonClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          );
        }

        return (
          <NavLink
            key={path}
            to={path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              classNames(commonClass, {
                [styles.active]: isActive,
              })
            }
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
};
