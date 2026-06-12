/* eslint-disable prettier/prettier */

//#region IMPORTS
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import cn from 'classnames';

import styles from './HeaderNavigation.module.scss';
//#endregion

//#region STYLES_&_CONSTANTS
const {
  mobileNavigation,
  navigation,
  navigationLink,
  navigationLinkActive,
  navigationLinkHideActive,
  fromLeft,
  fromRight,
} = styles;

const navLinks = [
  { title: 'home', href: '/' },
  { title: 'phones', href: '/phones' },
  { title: 'tablets', href: '/tablets' },
  { title: 'accessories', href: '/accessories' },
];
//#endregion

interface Props {
  isMobileMenu?: boolean;
}

export const HeaderNavigation: React.FC<Props> = ({ isMobileMenu }) => {
  //#region STATE
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  //#endregion

  //#region HANDLERS_&_HELPERS
  const handleMouseEnter = (index: number) => {
    if (hoveredIndex !== null && hoveredIndex !== index) {
      setLastIndex(hoveredIndex);
    }

    setHoveredIndex(index);
    setIsHovered(true);
  };

  const getNavLinkClass = (index: number, isActive: boolean) => {
    const isMovingLeft = lastIndex !== null && index < lastIndex;

    return cn(navigationLink, {
      [navigationLinkActive]: isActive,
      [navigationLinkHideActive]: isActive && isHovered,
      [fromRight]: isMovingLeft,
      [fromLeft]: !isMovingLeft,
    });
  };
  //#endregion

  //#region RENDER
  return (
    <nav
      className={`
        ${navigation}
        ${isMobileMenu ? mobileNavigation : ''}
      `}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
        setLastIndex(null);
      }}
    >
      {navLinks.map(({ title, href }, index) => (
        <NavLink
          key={href}
          to={href}
          onMouseEnter={() => handleMouseEnter(index)}
          className={({ isActive }) => getNavLinkClass(index, isActive)}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
  //#endregion
};
