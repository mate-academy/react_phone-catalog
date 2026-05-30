import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={s.page}>
      <div className={s.container}>
        <h2 className={s.pageTitle}>Page not found</h2>
        <Link to={'/'} className={s.pageLink}>
          Go to Home Page
        </Link>
      </div>
    </section>
  );
};
