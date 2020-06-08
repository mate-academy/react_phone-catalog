import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { NavItem } from './NavItem';
import { useRouter } from '../_hooks/useRouter';

const navList: NavList = [
  { title: 'Home', link: '/', exact: true },
  { title: 'Phones', link: '/phones', exact: false },
  { title: 'Tablets', link: '/tablets', exact: false },
  { title: 'Accessories', link: '/accessories', exact: false },
];

export const Nav = ({ isNavOpen }: NavProps) => {
  const { pathname } = useRouter();
  const [coords, setCoords] = useState<any>(null);
  const hash: Record<string, any> = useRef({});

  const onMount = useCallback((link: string, ref) => {
    hash.current = { ...hash.current, [link]: ref };
  }, []);

  useEffect(() => {
    const rootPath = `/${pathname.split('/')[1]}`;

    if (hash.current[rootPath]) {
      const node = hash.current[rootPath];

      setCoords(node.current.getBoundingClientRect());
    } else {
      setCoords(null);
    }
  }, [pathname, hash]);

  return (
    <nav className={cn({
      nav: true,
      'nav--opened': isNavOpen,
    })}
    >
      <ul className="nav__list">
        {navList.map(({ title, link, exact }) => (
          <NavItem
            key={title}
            title={title}
            link={link}
            exact={exact}
            onMount={onMount}
          />
        ))}
        {coords && (
          <span
            className="nav__active-element"
            style={{
              width: `${coords.width}px`,
              left: `${coords.x}px`,
            }}
          />
        )}
      </ul>
    </nav>
  );
};
