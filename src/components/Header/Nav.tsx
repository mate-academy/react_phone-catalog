import React, { useCallback, useState } from 'react';
import { NavItem } from './NavItem';

const navList: NavList = [
  { title: 'Home', link: '/home', exact: true },
  { title: 'Phones', link: '/phones', exact: false },
  { title: 'Tablets', link: '/tablets', exact: false },
  { title: 'Accessories', link: '/accessories', exact: false },
];

export const Nav = () => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [doesNodeExist, setNode] = useState(null);

  const ref = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
      setLeft(node.getBoundingClientRect().x);
    }

    setNode(node);
  }, []);

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navList.map(({ title, link, exact }) => (
          <NavItem
            key={title}
            title={title}
            link={link}
            exact={exact}
            linkRef={ref}
          />
        ))}
        {doesNodeExist && (
          <span
            className="nav__active-element"
            style={{
              width: `${width}px`,
              left: `${left}px`,
            }}
          />
        )}
      </ul>
    </nav>
  );
};
