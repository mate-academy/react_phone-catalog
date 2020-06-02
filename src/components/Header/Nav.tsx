import React from 'react';
import { NavItem } from './NavItem';

const navList: NavList = [
  { title: 'Home', link: '/', exact: true },
  { title: 'Phones', link: '/phones', exact: false },
  { title: 'Tablets', link: '/tablets', exact: false },
  { title: 'Accessories', link: '/accessories', exact: false },
];

export const Nav = ({ headerItemRef }: NavProps) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navList.map(({ title, link, exact }) => (
          <NavItem
            key={title}
            title={title}
            link={link}
            exact={exact}
            headerItemRef={headerItemRef}
          />
        ))}
      </ul>
    </nav>
  );
};
