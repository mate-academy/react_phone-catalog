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
            <Link
              to="https://github.com/dimon2202/react_phone-catalog/tree/develop"
              className={s.footer__item}
              target="_blank"
            >
              Github
            </Link>
            <Link
              to="https://github.com/dimon2202"
              className={s.footer__item}
              target="_blank"
            >
              Contacts
            </Link>
            <Link
              // eslint-disable-next-line max-len
              to="https://github.com/dimon2202/react_phone-catalog/blob/develop/LICENSE"
              className={s.footer__item}
              target="_blank"
            >
              Rights
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
