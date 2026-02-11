import { Link } from 'react-router-dom';
import scss from './NotFoundPage.module.scss';
import { ButtonBack } from '../shared/components/ButtonBack';

export const NotFoundPage = () => {
  return (
    <section className={scss.notFoundPage}>
      <ButtonBack />
      <h1 className={scss.notFoundPage__title}>Page not found</h1>
      <img
        src={`${import.meta.env.BASE_URL}img/page-not-found.png`}
        alt="Page not found"
        className={scss.notFoundPage__image}
      />

      <Link
        to={`${import.meta.env.BASE_URL}`}
        className={scss.notFoundPage__link}
      >
        Go to Home
      </Link>
    </section>
  );
};
