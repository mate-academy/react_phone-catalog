import { NavBar } from '../NavBar';
import './Menu.scss';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <aside className="menu page__menu page__menu--target" id="menu">
      <div className="top-bar top-bar--aside">
        <Link to="/" className="icon icon--logo top-bar__logo"></Link>
        <Link to="/" className="icon icon--close top-bar__close"></Link>
      </div>

      <NavBar />

      <div className="menu__bottom-bar">
        <Link
          to="/favorites"
          className="icon icon--heart menu__bottom-bar--heart"
        ></Link>

        <Link
          to="/cart"
          className="icon icon--bag menu__bottom-bar--bag"
        ></Link>
      </div>
    </aside>
  );
};
