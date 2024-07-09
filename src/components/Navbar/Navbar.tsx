import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../Navbar/Navbar.module.scss';

type LinkItem = {
  url: string;
  text: string;
  openInNewTab?: boolean;
};

type Props = {
  links: LinkItem[];
  onClick?: () => void;
  customStyle?: string;
};

export const Navbar: React.FC<Props> = ({ links, onClick, customStyle }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navbarItem, {
      [styles.active]: isActive,
      [customStyle || '']: customStyle,
    });

  return (
    <>
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.url}
          className={getLinkClass}
          onClick={onClick}
          target={link.openInNewTab ? '_blank' : undefined}
        >
          {link.text}
        </NavLink>
      ))}
    </>
  );
};
