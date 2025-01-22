/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../Tools/ScrollToTop';
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <Link to="/">
          <img className={style.footer__logo} src="/img/Logo.png" alt="Logo" />
        </Link>
        <section className={style.footer__links}>
          <a
            className={style.footer__link}
            href="https://github.com/olshum8/react_phone-catalog?tab=readme-ov-file#product-pages"
          >
            Github
          </a>
          <a className={style.footer__link} href="">
            Contacts
          </a>
          <a className={style.footer__link} href="">
            Rights
          </a>
        </section>
        <button className={style.up_button} onClick={scrollToTop}>
          <p>Back to top</p>
          <span className={style.up_button__icon}></span>
        </button>
      </div>
    </>
  );
};
