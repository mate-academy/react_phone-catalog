import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import s from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={`footer p-0 ${s.footer}`}>
      <div className={`container ${s.footer__container}`}>
        <div className="is-flex-tablet is-justify-content-space-between is-align-items-center">
          <div className={`is-flex ${s.footer__logo_wrap}`}>
            <a href="#">
              <img src="/img/logo/logo.png" alt="Logo" />
            </a>
          </div>

          <div className={`is-flex ${s.footer__links}`}>
            <a href="https://github.com/Larysa1387" className={s.footer__link}>
              Github
            </a>
            <a href="#" className={s.footer__link}>
              Contacts
            </a>
            <a href="#" className={s.footer__link}>
              Rights
            </a>
          </div>
          <div
            className={`is-flex is-align-items-center ${s.footer__up_btn_wrap}`}
          >
            <span className={`${s.up_btn__text}`}>Back to top</span>
            <button
              className={`button ${s.up_btn}`}
              aria-haspopup="true"
              onClick={scrollToTop}
            >
              <span className="icon is-small">
                <FontAwesomeIcon
                  icon={faAngleUp}
                  aria-hidden="true"
                  style={{ color: '#0F0F11' }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
