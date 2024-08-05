import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <div className="NotFoundPage">
    <div className="container container--with-min-height">
      <div className="NotFoundPage__content">
        <h1 className="NotFoundPage__title">Oops!</h1>
        <h2 className="NotFoundPage__subtitle">404 - Page not found</h2>
        <p className="NotFoundPage__paragpraph">
          We can&apos;t seem to find the page you&apos;re looking for.
        </p>

        <Link to="/" className="NotFoundPage__button">
          Go to homepage
        </Link>
      </div>
    </div>
  </div>
);
