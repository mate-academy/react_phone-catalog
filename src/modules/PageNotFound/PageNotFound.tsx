import { useNavigate } from 'react-router-dom';
import style from './PageNotFound.module.scss';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={style['not-found']}>
      <button
        className={style['not-found__button']}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className={style['not-found__title']}>Page not found</h1>

      <div className={style['not-found__style']}></div>
    </section>
  );
};
