import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="NotFoundPage">
    <div className="container container--with-min-height">
      <div className="NotFoundPage__content">
        <h1 className="NotFoundPage__title">Oops!</h1>
        <h2 className="NotFoundPage__subtitle">404 - Page not found</h2>

        <Link to="/home" className="NotFoundPage__button">
          Go to homepage
        </Link>
      </div>
    </div>
  </div>
);
