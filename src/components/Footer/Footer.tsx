import { Link } from 'react-router-dom';
import { Button } from '../Button';
import s from './Footer.module.scss';

export const Footer = () => {
  const handleScrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={s.Footer}>
      <div className={s.Footer__content}>
        <Link to="#" className={s.Footer__logo}>
          <img src="/img/icons/icon-logo.svg" className="logo" alt="logo" />
        </Link>

        <div className={s.Footer__links}>
          <a
            href="https://github.com/maxmodrr"
            target="_blank"
            className={s.Footer__link}
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href=" https://t.me/maxxxxmodr"
            target="_blank"
            className={s.Footer__link}
          >
            Contacts
          </a>
          <Link to="/important" className={s.Footer__link}>
            Rights
          </Link>
        </div>

        <div className={s.Footer__bottom}>
          <p className={s.Footer__backTo}>Back to top</p>
          <Button onClick={handleScrollUp} direction="arrowUp" />
        </div>
      </div>
    </footer>
  );
};
