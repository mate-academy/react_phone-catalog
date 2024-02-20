import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>
        Oops, page not found
      </h2>

      <Link
        to="/"
        className="not-found-page__text"
      >
        Go to Main page
      </Link>
    </div>
  );
};
