import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../../context/PageContext';

const links = [
  { id: 1, title: 'home' },
  { id: 2, title: 'phones' },
  { id: 3, title: 'tablets' },
  { id: 4, title: 'accessories' },
];

export const Menu = () => {
  const { lastPage } = useContext(PageContext);

  return (
    <section className="menu flex">
      <nav className="menu__nav nav">
        {links.map(link => (
          <Link
            key={link.id}
            to={`/${link.title}`}
            className={classNames('menu__nav-item uppercase nav__item', {
              'nav__item--selected': lastPage === link.title,
            })}
          >
            {`${link.title[0].toUpperCase()}${link.title.slice(1)}`}
          </Link>
        ))}
        {/* <Link
          to="#"
          className={classNames('menu__nav-item uppercase nav__item', {
            'nav__item--selected': lastPage === 'home',
          })}
        >
          Home
        </Link>
        <Link to="/phones" className={isActiveLink}>
          Phones
        </Link>
        <Link to="/tablets" className={isActiveLink}>
          Tablets
        </Link>
        <Link to="/accessories" className={isActiveLink}>
          Accessories
        </Link> */}
      </nav>
    </section>
  );
};
