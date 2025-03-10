import { Logo } from '../shared/Logo';
import s from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={s.footer}>
      <Logo />
      <div className={s.footer__list_wrapper}>
        <ul className={s.footer__list}>
          <li className={s.footer__item}>
            <a href="#" className={s.footer__item_link}>
              Github
            </a>
          </li>
          <li className={s.footer__item}>
            <a href="#" className={s.footer__item_link}>
              Contacts
            </a>
          </li>
          <li className={s.footer__item}>
            <a href="#" className={s.footer__item_link}>
              Rights
            </a>
          </li>
        </ul>
      </div>
      <div className={s.footer__back_to_top}>
        Back to top
        <button className={s.footer__back_to_top_button}>
          <a href="#">
            <img src="./img/icons/backToTop.png" alt="back to top" />
          </a>
        </button>
      </div>
    </div>
  );
};
