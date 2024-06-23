import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <main className="not-found-page container">
    <h1 className="not-found-page__title">Page not found</h1>
    <Link to={'/'} className="not-found-page__home-link">
      Back to home
    </Link>
  </main>
);
