import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <section className={style.page}>
      <img className={style.img} src="./img/page-not-found.png" alt="" />
      <Link to="/" className={style.link}>
        Go to Home Page
      </Link>
    </section>
  );
};

export default NotFoundPage;
