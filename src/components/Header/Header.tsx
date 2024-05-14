import './Header.scss';
import { Link, useParams } from 'react-router-dom';
//import { Navigation } from './components/Navigation/Navigation';

import { Navigation } from './components/Navigation/Navigation';

export const Header = () => {
  const { menu } = useParams();

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">
          <img src={'img/logo.png'} alt="logo" className="header__logo--img" />
        </Link>

        <Navigation className={'header__nav'} />
        {menu ? (
          <Link to=".." className="nav__icon nav__icon--hide">
            <div className="icon icon--close"></div>
          </Link>
        ) : (
          <Link to="/menu" className="nav__icon nav__icon--hide">
            <div className="icon icon--menu"></div>
          </Link>
        )}
      </header>
    </>
  );
};
