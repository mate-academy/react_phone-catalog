import { Link } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        <li className="menu__list-element">
          <Link className="menu__link" to="/home">
            home
          </Link>
        </li>
        <li className="menu__list-element">
          <Link className="menu__link" to="/phones">
            Phones
          </Link>
        </li>
        <li className="menu__list-element">
          <Link className="menu__link" to="/tablets">
            tablets
          </Link>
        </li>
        <li className="menu__list-element">
          <Link className="menu__link" to="/accessories">
            accessories
          </Link>
        </li>
      </ul>

      <div className="menu__footer">
        <Link
          to="/favorites"
          className="menu__icon menu__icon--favorites"
        ></Link>
        <Link to="/cart" className="menu__icon  menu__icon--cart"></Link>
      </div>
    </div>
  );
};
