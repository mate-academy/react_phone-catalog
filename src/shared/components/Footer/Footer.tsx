import s from './Footer.module.scss';
import { ChevronUp } from 'lucide-react';
import logo from '../../../assets/Logo.svg'; // замени путь на свой

export const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <a href="/" className={s.logo} aria-label="Go to homepage">
          <img src={logo} alt="Nice Gadgets logo" />
        </a>
        <nav className={s.links}>
          <a
            href="https://github.com/lublubuterbrodi"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="#contacts">Contacts</a>
          <a href="#rights">Rights</a>
        </nav>
        <button className={s.toTop} onClick={scrollTop}>
          <span className={s.toTopLabel}>Back to top</span>
          <span className={s.iconSquare} aria-hidden="true">
            <ChevronUp size={16} />
          </span>
        </button>
      </div>
    </footer>
  );
};
