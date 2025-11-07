import { Link } from 'react-router-dom';
import img from '../../../public/img/page-not-found.png';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={style.wrapper}>
      <h1>{`Page not found`}</h1>
      <img src={img} alt="" />

      <Link to={'/'} className={style.link}>
        Back to Home
      </Link>
    </div>
  );
};
