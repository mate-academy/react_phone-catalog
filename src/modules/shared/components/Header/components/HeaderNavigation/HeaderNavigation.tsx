/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import styles from './HeaderNavigation.module.scss';
//#endregion

//#region STYLES_&_CONSTANTS
const {
  burgerNavigation,
  navigation,
  navigationLink,
  navigationLinkActive,
  navigationLinkHideActive,
  fromLeft,
  fromRight,
} = styles;

const navLinks = [
  { id: 'home', href: '/' },
  { id: 'phones', href: '/phones' },
  { id: 'tablets', href: '/tablets' },
  { id: 'accessories', href: '/accessories' },
];
//#endregion

interface Props {
  isBurgerMenu?: boolean;
}

export const HeaderNavigation: React.FC<Props> = ({ isBurgerMenu }) => {
  //#region STATE
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const { t } = useTranslation();
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
        ${isBurgerMenu ? burgerNavigation : ''}
      `}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
        setLastIndex(null);
      }}
    >
      {navLinks.map(({ id, href }, index) => (
        <NavLink
          key={href}
          to={href}
          onMouseEnter={() => handleMouseEnter(index)}
          className={({ isActive }) => getNavLinkClass(index, isActive)}
        >
          {t(`header.navigation.${id}`)}
        </NavLink>
      ))}
    </nav>
  );
  //#endregion
};
