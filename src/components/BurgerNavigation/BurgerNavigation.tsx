import './burger-navigation.scss';
import { Link } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import cn from 'classnames';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

export const BurgerNavigation: React.FC<Props> = ({
  isBurgerMenu,
  onClose,
}) => {
  const { pathname, search } = useCurrentPath(); // ← теперь получаем и pathname, и search из контекста

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
              <Link
                className={cn('burger-link', {
                  'is-active':
                    path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={{ pathname: path, search }} // ← сохраняем текущие параметры при переходе
                onClick={onClose}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="burger-footer">
          <div className={cn('burger-icon-container', {
              'is-active': pathname === '/favorites',
            })}
          >
            <Link
              to={{ pathname: '/favorites', search }}
              className="burger-footer-link"
              onClick={onClose}
            >
              <img
                src="/img/icons/FavoritesHeartLike.svg"
                alt="Favourites icon"
                className="icon"
              />
            </Link>
          </div>

          <div className="burger-icon-container">
            <Link
              to={{ pathname: '/', search }}
              className="burger-footer-link"
              onClick={onClose}
            >
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
