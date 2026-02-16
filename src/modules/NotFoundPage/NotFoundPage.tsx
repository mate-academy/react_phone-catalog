import { useNavigate } from 'react-router-dom';
import notFoundPage from '../../assets/img/page-not-found.png';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.pageNotFound}>
      <h1 className={style.pageNotFound__title}>Page not found =(</h1>
      <button
        type="button"
        className={style.pageNotFound__button}
        onClick={() => navigate('/home')}
      >
        Go to Home Page
      </button>
      <img
        src={notFoundPage}
        alt="Empty Cart"
        className={style.pageNotFound__img}
      />
    </div>
  );
};
