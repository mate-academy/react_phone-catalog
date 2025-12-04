import { NavLink } from 'react-router-dom';
import s from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <main className={s.notFound}>
      <img
        src="/img/error-404.png"
        alt="404_error"
        className={s.notFound__img}
      />
      <h1 className={s.notFound__title}>404</h1>
      <h2 className={s.notFound__subTitle}>Page not found</h2>
      <button className={s.notFound__btn}>
        <NavLink className={s.notFound__link} to="/">
          Back home
        </NavLink>
      </button>
    </main>
  );
};
