import { Link } from 'react-router-dom';
import notfound from '../../assets/images/page-not-found.png';
import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <main>
    <section className={s.container}>
      <div className={s.notFound}>
        <h1>Page not found</h1>
        <Link to="/">Go Back Home</Link>
        <img src={notfound} />
      </div>
    </section>
  </main>
);
