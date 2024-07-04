import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IsActiveMenuContext } from '../../context/IsActiveMenuContext';

const links = [
  { id: 1, title: 'home' },
  { id: 2, title: 'phones' },
  { id: 3, title: 'tablets' },
  { id: 4, title: 'accessories' },
];

export const Menu = () => {
  const { setIsActiveMenu } = useContext(IsActiveMenuContext);
  const location = useLocation();
  const formattedLocation = useMemo(
    () => location.pathname.split('/'),
    [location],
  );

  return (
    <section className="menu flex">
      <nav className="menu__nav nav">
        {links.map(link => (
          <Link
            key={link.id}
            to={`/${link.title}`}
            onClick={() => setIsActiveMenu(false)}
            className={classNames('menu__nav-item uppercase nav__item', {
              'nav__item--selected': formattedLocation[1] === link.title,
            })}
          >
            {`${link.title[0].toUpperCase()}${link.title.slice(1)}`}
          </Link>
        ))}
      </nav>
    </section>
  );
};
