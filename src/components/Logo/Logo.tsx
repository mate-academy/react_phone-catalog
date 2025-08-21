import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Logo.module.scss';
import { useAppState } from '../../contexts/AppContext';

export const Logo: React.FC<{ location: 'navbar' | 'footer' }> = ({
  location,
}) => {
  const { theme } = useAppState();

  return (
    <NavLink
      to="/"
      className={`
        ${styles.logo} 
        ${location === 'navbar' ? styles.navbarLogo : styles.footerLogo}
      `}
    >
      <img
        className={`
          ${styles.img} 
          ${location === 'navbar' ? styles.navbarImg : styles.footerImg}
        `}
        src={`/img/icons/${theme}-theme/Logo.svg`}
        alt="Logo"
      />
    </NavLink>
  );
};
