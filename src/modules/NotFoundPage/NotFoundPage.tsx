import { Link } from 'react-router-dom';
import notfound from '/img/page-not-found.png';
import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <main>
    <section className={s.container}>
      <h1>Page not found</h1>
      <Link to="/">Go Home</Link>
      <img src={notfound} />
    </section>
  </main>
);
