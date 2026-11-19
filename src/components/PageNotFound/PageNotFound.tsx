import { Link } from 'react-router-dom';
import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <main className="page-not-found__main">
      <div className="page-not-found__content">
        <div className="page-not-found__img--wrapper">
          <img
            className="page-not-found__img"
            src="img/page-not-found.png"
            alt=""
          />
        </div>
        <div className="page-not-found__title">
          Page not found
          <Link to={'/'} className="page-not-found__home-link">
            <div className="page-not-found__home">Home</div>
          </Link>
        </div>
      </div>
    </main>
  );
};
