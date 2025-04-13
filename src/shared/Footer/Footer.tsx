import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo';
import s from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation('Footer');
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
                {t('Github')}
              </a>
            </li>
            <li className={s.footer__item}>
              <a
                href="https://github.com/Vitalii120296"
                className={s.footer__item_link}
              >
                {t('Contacts')}
              </a>
            </li>
            <li className={s.footer__item}>
              <a
                href="https://github.com/Vitalii120296"
                className={s.footer__item_link}
              >
                {t('Rights')}
              </a>
            </li>
          </ul>
        </div>
        <div className={s.footer__back_to_top}>
          {t('Back to top')}
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
