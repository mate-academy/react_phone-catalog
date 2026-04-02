import { footerNav } from '../../constants/constants';
import { Icon } from '../ui/Icon/Icon';
import style from './Footer.module.scss';

export const Footer = () => {
  const handleButtonClick = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={style.container}>
      <footer className={style.footer}>
        <div className={style.footer__container}>
          <div className={style['footer__container-logo']}>
            <Icon className={style.footer__logo} nameIcon="logo" />
          </div>

          <nav className={style.footer__nav}>
            <ul className={style.footer__list}>
              {footerNav.map(item => (
                <li key={item.textLink} className={style.footer__item}>
                  <a
                    className={style.footer__link}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.textLink}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={style.footer__buttonBack}
            onClick={handleButtonClick}
          >
            <span className={style.footer__buttonText}>Back to top</span>
            <div className={style.footer__buttonIcon}>
              <Icon className={style.footer__arrow} nameIcon="right" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};
