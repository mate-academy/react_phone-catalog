import { Logo } from '../../Logos/Logo';
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <nav className={style.footer__navFooter}>
          <a href="#" className={style.footer__navLink}>
            <Logo />
          </a>

          <div className={style.footer__navList}>
            <a href="#" className={style.footer__navLink}>
              Github
            </a>
            <a href="#" className={style.footer__navLink}>
              Contacts
            </a>
            <a href="#" className={style.footer__navLink}>
              Rights
            </a>
          </div>

          <a href="#" className={style.footer__navLink}>
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
};
