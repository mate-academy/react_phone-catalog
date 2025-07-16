import './header-navigation.scss'
import { Link } from 'react-router-dom';

// type Props = {
//   isBurgerMenu: boolean;
// };

// export const HeaderNavigation: React.FC<Props> = () => {
export const HeaderNavigation: React.FC = () => {
  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/' },
    { title: 'TABLETS', path: '/' },
    { title: 'ACCESSORIES', path: '/' },
  ];

  // if (!isBurgerMenu) {
  //   return null;
  // }

  return (
    <nav className="header-navigation">
      <div className="header-container">
        <ul className="header-list">
          {pages.map(({ title, path }) => (
            <li className="header-list-item" key={title}>
              <Link className="header-link" to={path}>
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
