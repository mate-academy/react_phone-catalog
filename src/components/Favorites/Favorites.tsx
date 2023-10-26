import './Favorites.scss';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

export const Favorites = () => {
  return (
    <div className="navigation">
      <div className="navigation__icon-box">
        <Link to="/" className="navigation__icon">
          <ReactSVG
            src="img/icons/Favourites (Heart Like).svg"
          />
        </Link>
      </div>

      <div className="navigation__icon-box">
        <Link to="/" className="navigation__icon">
          <ReactSVG
            src="img/icons/Shopping bag (Cart).svg"
          />
        </Link>
      </div>

    </div>
  );
};
