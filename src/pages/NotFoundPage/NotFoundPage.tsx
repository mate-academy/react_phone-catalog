import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage:React.FC = () => {
  return (
    <div className="no-page">
      <h1 className="no-page__title">Page not found</h1>

      <h2 className="no-page__code">404</h2>

      <p className="no-page__description">
        Seems like page you are looking for does&#x27;t exist
      </p>

      <Link
        to="/"
        className="no-page__button"
      >
        Go to homepage
      </Link>
    </div>
  );
};
