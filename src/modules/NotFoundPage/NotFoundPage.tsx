import { Link } from 'react-router-dom';
import { PageNotFoundImg } from '@/shared/assets/error-img';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <PageNotFoundImg aria-hidden="true" />
      <h1 className="not-found-page__title visually-hidden">Not found page</h1>
      <Link to="/" className="not-found-page__button">
        Go to Home
      </Link>
    </div>
  );
};
