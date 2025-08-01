import './header-navigation.scss'
import { Link, useSearchParams } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import cn from 'classnames';

export const HeaderNavigation: React.FC = () => {
  const currentPath = useCurrentPath();
  const [searchParams] = useSearchParams();
  const currentParams = searchParams.toString();

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
                className={cn("header-link", {
                  'is-active': path === '/' ? currentPath === '/' : currentPath.startsWith(path),
                })}
                to={{ pathname: path, search: currentParams }}
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
