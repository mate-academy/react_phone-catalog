import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <section className="not-found">
      <img
        className="not-found__image"
        src="/img/page-not-found.png"
        alt="Page not found"
      />

      <h1 className="not-found__title">Page not found</h1>

      <Link to="/" className="not-found__button">
        Back to home
      </Link>
    </section>
  );
};
