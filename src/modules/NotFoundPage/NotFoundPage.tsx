import { useNavigate } from 'react-router-dom';
import style from './NotFoundPage.module.scss';
import notFoundPage from '../../assets/img/notFound/page-not-found.png';
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.notFoundPage}>
      <h1 className={style.notFoundPage__title}>Page not found</h1>
      <button
        type="button"
        className={style.notFoundPage__button}
        onClick={() => navigate('/home')}
      >
        Go to Home Page
      </button>
      <img
        src={notFoundPage}
        alt="Empty Cart"
        className={style.notFoundPage__img}
      />
    </div>
  );
};
