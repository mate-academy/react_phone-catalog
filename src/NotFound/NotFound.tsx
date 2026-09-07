import { Link } from 'react-router-dom';
import './NotFound.scss';

export const NotFound = () => {
  return (
    <div className="not-found">
      <img
        src="./img/other/page-not-found.png"
        alt="404 Not Found"
        className="not-found__image"
      />
      <h2 className="not-found__title">Page not found</h2>
      <p className="not-found__text">Seems this page doesnt exist</p>
      <Link to="/" className="not-found__button">
        Home
      </Link>
    </div>
  );
};
