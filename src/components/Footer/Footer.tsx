import s from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={`${s.footer} ${s.container}`}>
      <a href="#" className={`${s.footer__link} ${s.footer__front}`}>
        <img src="../../img/icons/logo.svg" alt="logo" className={s.logo} />
      </a>
      <ul className={s.footer__list}>
        <li className={s.footer__item}>
          <a href="#" className={s.footer__link}>
            github
          </a>
        </li>
        <li className={s.footer__item}>
          <a href="#" className={s.footer__link}>
            contacts
          </a>
        </li>
        <li className={s.footer__item}>
          <a href="#" className={s.footer__link}>
            rights
          </a>
        </li>
      </ul>
      <a href="#" className={s.footer__back}>
        fasdfsa
      </a>
    </footer>
  );
};
