import { footerItems } from '@data/footerData';
import { Link } from 'react-router-dom';
import { ROUTES } from '@routes/index';

import cn from 'classnames';
import Logo from '@assets/icons/logo.svg';
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Logo" />
        </Link>
        <nav className={style.footer__nav}>
          <ul className={style.footer__nav_list}>
            {footerItems.map((item, idx) => (
              <li key={idx} className={style.footer__nav_item}>
                <Link
                  to={item.path}
                  className={cn(style.footer__nav_link, 'uppercase-text')}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={style.footer__back}>
          <p className={style.footer__back_text}>Back to top</p>
          <button
            className={style.footer__back_button}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          ></button>
        </div>
      </div>
    </footer>
  );
};
