import { Logo } from '../Logo';
import s from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="container">
      <div className={s.footer}>
        <Logo />
        <div className={s.footer__list_wrapper}>
          <ul className={s.footer__list}>
            <li className={s.footer__item}>
              <a
                href="https://github.com/Vitalii120296"
                className={s.footer__item_link}
              >
                Github
              </a>
            </li>
            <li className={s.footer__item}>
              <a
                href="https://github.com/Vitalii120296"
                className={s.footer__item_link}
              >
                Contacts
              </a>
            </li>
            <li className={s.footer__item}>
              <a
                href="https://github.com/Vitalii120296"
                className={s.footer__item_link}
              >
                Rights
              </a>
            </li>
          </ul>
        </div>
        <div className={s.footer__back_to_top}>
          Back to top
          <button
            className={s.footer__back_to_top_button}
            onClick={scrollToTop}
          >
            <img src="./img/icons/backToTop.png" alt="back to top" />
          </button>
        </div>
      </div>
    </div>
  );
};
