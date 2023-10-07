import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import footerList from '../../api/navFooter.json';
import './Footer.scss';

export const Footer: React.FC = () => {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />

        <div className="footer__nav">
          {footerList.map(item => (
            <a
              key={item.title}
              href={item.path}
              className="footer__link"
            >
              {item.title}
            </a>
          ))}
        </div>

        <Link
          className="button-top"
          to={`${location.pathname}`}
          onClick={handleScrollToTop}
        >
          <p className="button-top__text">
            Back to top
          </p>

          <span
            className="button-top__icon"
          />
        </Link>
      </div>
    </footer>
  );
};
