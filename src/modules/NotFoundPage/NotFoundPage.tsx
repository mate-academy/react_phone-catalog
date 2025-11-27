import { Link } from 'react-router-dom';
import scss from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={scss.notFoundPage}>
      <h1 className={scss.notFoundPage__title}>Page not found</h1>
      <img
        src="/img/page-not-found.png"
        alt="Page not found"
        className={scss.notFoundPage__image}
      />

      <Link to="/" className={scss.notFoundPage__link}>
        Go to Home
      </Link>
    </section>
  );
};
