import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import logo from '../../../public/icons/Logo.svg';
import arrow from '../../../public/icons/Arrow.svg';
import { scrollToTop } from '../../styles/utils/ScrollTop';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <Link to={'/'} className={style.nav_logo} onClick={scrollToTop}>
        <img src={logo} />
      </Link>
      <div className={style.footer__middle}>
        <Link to={'#'} className={style.links}>
          Github
        </Link>
        <Link to={'#'} className={style.links}>
          Contacts
        </Link>
        <Link to={'#'} className={style.links}>
          Rights
        </Link>
      </div>
      <Link
        to={'#'}
        className={`${style.links} ${style.backToTop}`}
        onClick={scrollToTop}
      >
        Back to top
        <div className={style.arrow__box}>
          <img src={arrow} className={style.arrow} />
        </div>
      </Link>
    </div>
  );
};
