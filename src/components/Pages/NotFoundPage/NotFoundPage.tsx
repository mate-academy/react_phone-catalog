import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <h1 className={style.titleNFP}>Page not found</h1>;
      <img
        className={style.imgNFP}
        src={`${import.meta.env.BASE_URL}/img/page-not-found.png`}
        alt="Page not found"
      />
      <Link className={style.homeLink} to="/">
        Go back home
      </Link>
      ;
    </>
  );
};
