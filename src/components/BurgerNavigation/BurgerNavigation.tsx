import { Link } from 'react-router-dom';

type Props = {
  isBurgerMenu: boolean;
};

export const BurgerNavigation: React.FC<Props> = ({isBurgerMenu} ) => {
  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/' },
    { title: 'TABLETS', path: '/' },
    { title: 'ACCESSORIES', path: '/' },
  ];

  return (
    isBurgerMenu ? (
      <nav className="navigation">
        <div className="nav-container">
          <ul className="nav__list">
            {pages.map(({ title, path }) => (
              <li className="nav__item" key={title}>
                <Link className="nav__link" to={path}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="burger-footer">
            <div className="icon-container">
              <Link to="/" className="burger-footer-link">
                <img
                  src="/img/icons/FavouritesHeartLike.svg"
                  alt="Favourites icon"
                  className="icon"
                />
              </Link>
            </div>

            <div className="icon-container">
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
    ) : null
  );
};
