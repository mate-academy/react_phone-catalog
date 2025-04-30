import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Page not found</h1>
      <p className={style.text}>
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link to="/" className={style.home}>
        Go to Home Page
      </Link>
    </div>
  );
};
