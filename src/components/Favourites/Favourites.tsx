import { Link } from 'react-router-dom';

export const Favourites = () => (
  <Link to="/" className="favourites header__button">
    <img
      src="./img/icons/favourites.svg"
      alt="Favourites button"
      className="favourites__icon"
    />
  </Link>
);
