/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './HeaderNavigation.module.scss';
import cn from 'classnames';
const {
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

export const HeaderNavigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

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

  return (
    <nav
      className={navigation}
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
};
