import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import cl from './Footer.module.scss';
import {
  ArrowButton,
  ArrowButtonDirection,
  ArrowButtonOrigin,
} from '../HomePage/ArrowButton';
import { useAppSelector } from '../../app/hooks';

const textContent = {
  about: {
    en: 'ABOUT',
    ua: 'ПРО ПРОЄКТ',
  },
  backTop: {
    en: 'Back to top',
    ua: 'Вершина сторінки',
  },
};

export const Footer = () => {
  const { language } = useAppSelector(st => st.global);

  return (
    <div className="container container__footer">
      <footer className={cl.footer}>
        <Logo />

        <ul className={cl.footer__links}>
          <li>
            <Link
              to="https://github.com/MaksymMohyla"
              target="_blank"
              className={cl.footer__link}
            >
              GITHUB
            </Link>
          </li>
          <li>
            <Link
              to="https://www.linkedin.com/"
              target="_blank"
              className={cl.footer__link}
            >
              LINKEDIN
            </Link>
          </li>
          <li>
            <Link to="about" className={cl.footer__link}>
              {textContent.about[language]}
            </Link>
          </li>
        </ul>

        <div className={cl.backTopContainer}>
          <p className={cl.backTopContainer__text}>
            {textContent.backTop[language]}
          </p>
          <ArrowButton
            direction={ArrowButtonDirection.UP}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            origin={ArrowButtonOrigin.ONFOOTER}
          />
        </div>
      </footer>
    </div>
  );
};
