import { Link } from 'react-router-dom';
import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <div className="page-not-fond">
      <h1>Page not found</h1>
      <Link
        aria-label="page not found"
        to="/"
        className="page-not-fond__link"
      />
    </div>
  );
};
