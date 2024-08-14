import notFoundPage from '../../assets/img/page-not-found.png';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={style.pageNotFound}>
    <h1 className={style.pageNotFound__title}>Page not found =(</h1>
    <img
      src={notFoundPage}
      alt="Empty Cart"
      className={style.pageNotFound__img}
    />
  </div>
);
