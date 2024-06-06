import './Navbar.scss';

import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/scrollToTop';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item uppercase', {
    active: isActive,
  });

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Phones', link: '/phones' },
  { name: 'Tablets', link: '/tablets' },
  { name: 'Accessories', link: '/accessories' },
];

type Props = {
  onClick?: () => void;
};

export const Navbar: React.FC<Props> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    scrollToTop();
  };

  return (
    <>
      {navItems.map(item => (
        <NavLink
          key={item.name}
          to={item.link}
          className={getLinkClass}
          onClick={() => handleClick()}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
};
