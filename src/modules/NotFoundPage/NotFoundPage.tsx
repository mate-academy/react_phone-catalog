import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';
import { PathType } from '../../types/Types';

export const NotFoundPage = () => {
  return (
    <div className={style.notFound}>
      <h2 className={style.notFound__title}>Page not found</h2>

      <img
        className={style.notFound__img}
        src="img/page-not-found.webp"
        alt="Not found page"
      />

      <Link className={style.notFound__link} to={PathType.HOME}>
        Back to home page
      </Link>
    </div>
  );
};
