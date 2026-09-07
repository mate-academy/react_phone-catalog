import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="notfound">
      <h1 className="notfound__title">Page not found</h1>
      <Link to="/" className="notfound__link">
        Back to home
      </Link>
    </div>
  );
};
