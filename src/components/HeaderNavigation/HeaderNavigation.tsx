
import './header-navigation.scss';
import { Link, useLocation } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import cn from 'classnames';

export const HeaderNavigation: React.FC = () => {
  const { pathname, search } = useCurrentPath();

  const location = useLocation();
  const backSearch = location.state?.search || search;

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSORIES', path: '/accessories' },
  ];

  return (
    <nav className="header-navigation">
      <div className="header-container">
        <ul className="header-list">
          {pages.map(({ title, path }) => (
            <li className="header-list-item" key={title}>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn("header-link", {
                  'is-active': path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={`${path}${backSearch}`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="header-actions">
          <div className="header-icon-container">
            <Link to="/" className="header-actions-link">
              <img
                src="/img/icons/FavouritesHeartLike.svg"
                alt="Favourites icon"
                className="icon"
              />
            </Link>
          </div>

          <div className="header-icon-container">
            <Link to="/" className="header-actions-link">
              <img
                src="/img/icons/ShoppingBag.svg"
                alt="Shopping Bag icon"
                className="icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
