import './burger-navigation.scss'
import { Link } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import cn from 'classnames';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

export const BurgerNavigation: React.FC<Props> = ({ isBurgerMenu, onClose }) => {
  const currentPath = useCurrentPath();

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSORIES', path: '/accessories' },
  ];

  return (
    <nav className={`burger-navigation ${isBurgerMenu ? 'is-open' : ''}`}>
      <div className="burger-container">
        <ul className="burger-list">
          {pages.map(({ title, path }) => (
            <li className="burger-list-item" key={title}>
              {/* <Link className="burger-link" to={path}> */}
              <Link className={cn("burger-link", { 'is-active': path === currentPath })} to={path} onClick={onClose}>
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="burger-footer">
          <div className="burger-icon-container">
            <Link to="/" className="burger-footer-link">
              <img
                src="/img/icons/FavouritesHeartLike.svg"
                alt="Favourites icon"
                className="icon"
              />
            </Link>
          </div>

          <div className="burger-icon-container">
            <Link to="/" className="burger-footer-link">
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
