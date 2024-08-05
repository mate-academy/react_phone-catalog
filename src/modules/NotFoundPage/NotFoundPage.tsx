import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="not-found-page">
          <h1 className="page-title not-found-page__title"> Page not found </h1>
          <Link to="/" className="not-found-page__button">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
};
