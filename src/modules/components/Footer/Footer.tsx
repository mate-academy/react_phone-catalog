import { Link } from 'react-router-dom';
import './Footer.scss';

const NAV_LINKS = [
  { href: 'https://github.com', label: 'Github' },
  { href: '#contacts', label: 'Contacts' },
  { href: '#rights', label: 'Rights' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo-link" aria-label="Home">
        <img
          className="footer__logo"
          src="/img/logo-2.png"
          alt="Nice Gadgets"
        />
      </Link>

      <nav className="footer__nav" aria-label="Footer navigation">
        <ul className="footer__nav-list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className="footer__nav-link"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="footer__top">
        <span className="footer__top-label">Back to top</span>
        <button
          className="footer__top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 12V4M8 4L4 8M8 4l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
