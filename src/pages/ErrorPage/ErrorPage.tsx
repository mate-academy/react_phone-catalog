import { Link } from 'react-router-dom';
import style from './ErrorPage.module.scss';

export const ErrorPage = () => (
  <div className={style.container}>
    <h1>Page not found</h1>
    <Link className={style.link} to="/">Go to the home page</Link>
  </div>
);
