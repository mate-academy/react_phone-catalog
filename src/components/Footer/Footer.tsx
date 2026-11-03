import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { Logo } from '../Ui/Logo';

const cx = classNames.bind(styles);

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/a-floreskul' },
  { label: 'Contacts', href: 'mailto:floreskula830@gmail.com' },
  { label: 'Rights', href: '#' },
];

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={cx('footer')}>
      <div className={cx('footer__container')}>
        <Logo />

        <nav className={cx('footer__nav')} aria-label="Footer">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              className={cx('footer__link')}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={cx('footer__button-wrapper')}>
          <button
            type="button"
            className={cx('footer__to-top')}
            onClick={handleBackToTop}
          >
            <span className={cx('footer__to-top-label')}>Back to top</span>

            <span className={cx('footer__to-top-icon')}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 10L8 6L12 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
