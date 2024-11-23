import { Link } from 'react-router-dom';
import style from './EmptyFavorite.module.scss';

const EmptyFavorite = () => {
  return (
    <section className={style.page}>
      <img className={style.img} src="/img/product-not-found.png" alt="" />
      <Link to="/" className={style.link}>
        Go to Home Page
      </Link>
    </section>
  );
};

export default EmptyFavorite;
