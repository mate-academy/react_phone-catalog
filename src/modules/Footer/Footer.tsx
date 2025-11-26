import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import top from '../../assets/images/icons/arrow-top.svg';
import s from './Footer.module.scss';

export const Footer: FC = () => (
  <footer className={`${s.footer} ${s.container}`}>
    <div className={s.footerLogo}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
    <nav className={s.footerNav}>
      <Link to="https://tvk777.github.io/react_phone-catalog/">Github</Link>
      <Link to="#">Contacts</Link>
      <Link to="#">Rights</Link>
    </nav>
    <div
      className={s.backTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span>Back to top</span>
      <img src={top} alt="Back to top" />
    </div>
  </footer>
);
