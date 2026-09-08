/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import footerStyles from './Footer.module.scss';
import iconStyles from './icon.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={footerStyles.footer__wrapper}>
      <div className={footerStyles.footer}>
        <div className={footerStyles.footer__navigation__wrapper}>
          <Link to="/" className={footerStyles.footer__logo}>
            <img
              src="./img/gadgets-logo.png"
              alt="img-logo"
              className={footerStyles['footer__logo-img']}
            />
          </Link>
        </div>

        <ul className={footerStyles.footer__list}>
          <li className={footerStyles.footer__item}>
            <a
              className={footerStyles.footer__link}
              target="_blank"
              href="https://github.com/Pavlo-lab-max-Kopalko/react_phone-catalog"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className={footerStyles.footer__item}>
            <a
              className={footerStyles.footer__link}
              href="https://www.linkedin.com/in/pavlo-kopalko-1a7a682a4/"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li className={footerStyles.footer__item}>
            <a
              className={footerStyles.footer__link}
              href="https://mate.academy/home"
            >
              rights
            </a>
          </li>
        </ul>
        <div className={footerStyles.footer__backToTopContainer}>
          <span
            className={`${iconStyles['icon--back-to-top']} ${iconStyles.icon}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
          </span>
          <button
            className={`${iconStyles['icon--arrow']} ${iconStyles.icon}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
