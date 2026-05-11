import { Link } from 'react-router-dom';
import s from './Footer.module.scss';
import { SliderButton } from '../../modules/shared/SliderButton';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footer__content}>
          <Link to="/">
            <img src="./img/logo.svg" alt="Logo" />
          </Link>
          <div className={s.footer__items}>
            <Link to="" className={s.footer__item}>
              Github
            </Link>
            <Link to="" className={s.footer__item}>
              Contacts
            </Link>
            <Link to="" className={s.footer__item}>
              rights
            </Link>
          </div>
          <div className={s.footer__toTop}>
            <div className={s.footer__back}>Back to top</div>
            <SliderButton
              direction="up"
              onClick={() => window.scrollTo({ top: 0 })}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
