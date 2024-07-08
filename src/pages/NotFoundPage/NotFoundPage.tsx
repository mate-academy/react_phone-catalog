import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <p className="not-found__message">Page not found</p>
      <p className="not-found__text">
        Use the following link to get back to
        <Link to="/" className="not-found__link">
          Home Page
        </Link>
      </p>
      <img
        src="img/page-not-found.png"
        alt="page not found"
        className="not-found__image"
      />
    </div>
  );
};
