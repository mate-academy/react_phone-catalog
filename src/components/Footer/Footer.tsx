import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import style from './Footer.module.scss';
import { FOOTER_LINKS } from '../../modules/shared/constants/footerNav';
import { FC, useCallback } from 'react';
import { Container } from '../Container';

export const Footer: FC = () => {
  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className={style.footer}>
      <Container>
        <div className={style.inner}>
          <Logo className={style['logo--footer']} />

          <nav className={style.nav} aria-label="Footer navigation">
            <ul className={style.navList}>
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={style.navLink}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <div className={style.backToTop}>
            <span className={style.backToTopLabel}>Back to top</span>
            <button
              className={style.backToTopBtn}
              onClick={handleBackToTop}
              aria-label="Scroll to top"
              type="button"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.500001"
                  y="31.5"
                  width="31"
                  height="31"
                  transform="rotate(-90 0.500001 31.5)"
                  stroke="#B4BDC4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5285 18.4712C11.2682 18.2109 11.2682 17.7888 11.5285 17.5284L15.5285 13.5284C15.7889 13.2681 16.211 13.2681 16.4713 13.5284L20.4713 17.5284C20.7317 17.7888 20.7317 18.2109 20.4713 18.4712C20.211 18.7316 19.7889 18.7316 19.5285 18.4712L15.9999 14.9426L12.4713 18.4712C12.211 18.7316 11.7889 18.7316 11.5285 18.4712Z"
                  fill="#313237"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
