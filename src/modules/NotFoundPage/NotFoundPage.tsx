import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={style.notFoundPage}>
      <img
        src="/img/page-not-found.png"
        alt="page-not-found"
        className={style.notFoundPage__img}
      />
      <h1 className={style.notFoundPage__title}>Page not found</h1>
      <p className={style.notFoundPage__text}>
        The page you are looking for doesn’t exist
      </p>
      <Link to="/" className={style.notFoundPage__btn}>
        Go to home
      </Link>
    </div>
  );
};
