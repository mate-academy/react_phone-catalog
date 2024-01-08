import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <h1 className="NotFoundPage__title">404 Page not found</h1>

      <p className="NotFoundPage__info">
        The page you are requested does not exist.
      </p>

      <p className="NotFoundPage__info">
        Click
        <Link to=".." className="NotFoundPage__link">
          here
        </Link>
        to continue shopping.
      </p>
    </div>
  );
};
