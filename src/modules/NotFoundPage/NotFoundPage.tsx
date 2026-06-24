import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.scss';
import notFoundImg from '../../../public/img/page-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Not Found Page</h1>
      <div className={s.notFoundBlock}>
        <img className={s.notFoundImg} src={notFoundImg} alt="notFound" />
      </div>
      <Link to="/" className={s.link}>
        Back to Home Page
      </Link>
    </div>
  );
};
