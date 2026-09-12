import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="page not-found">
      <h1 className="not-found__title">Page not found</h1>
      <Link to="/" className="not-found__link">
        Go back home
      </Link>
    </div>
  );
};
