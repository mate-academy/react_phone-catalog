// import './burger-navigation.scss'
import { Link } from 'react-router-dom';

type Props = {
  isBurgerMenu: boolean;
};

export const BurgerNavigation: React.FC<Props> = ({ isBurgerMenu }) => {
  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/' },
    { title: 'TABLETS', path: '/' },
    { title: 'ACCESSORIES', path: '/' },
  ];

  return (
    <nav className={`burger-navigation ${isBurgerMenu ? 'is-open' : ''}`}>
      <div className="burger-container">
        <ul className="burger-list">
          {pages.map(({ title, path }) => (
            <li className="burger-list-item" key={title}>
              <Link className="burger-link" to={path}>
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
