import style from './Footer.module.scss';
import logo from '../../assets/img/logos/mainlogo.svg';

export const Footer = () => (
  <footer className={style.footer}>
    <img src={logo} className={style.footer__logo} />
    <nav className={style.footer__nav}>
      <ul className={style.footer__nav__list}>
        <li className={style.footer__nav__item}>Github</li>
        <li className={style.footer__nav__item}>Contacts</li>
        <li className={style.footer__nav__item}>Rights</li>
      </ul>
    </nav>
    <div className={style.footer__backToTop}>
      <p className={style.footer__backToTop__text}>Back to top</p>
      <div className={style.footer__backToTop__button} />
    </div>
  </footer>
);
