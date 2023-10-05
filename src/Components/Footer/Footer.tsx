import { animateScroll as scroll } from 'react-scroll';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Footer.scss';
import '../../Helpers/container.scss';
import { generateClassNames } from '../../Helpers/functions';

const getClassNames = (
  { isActive }: { isActive: boolean },
) => generateClassNames(
  'footer__nav-link',
  { 'footer__nav-link--active': isActive },
);

export const Footer: React.FC = () => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <footer className="footer">
      <div className="container footer__content">
        <Logo />

        <div className="footer__nav">
          <NavLink
            to="https://HannaVasylieva.github.io/react_phone-catalog/"
            className={getClassNames}
            target="_blank"
          >
            Github
          </NavLink>

          <NavLink
            to="https://HannaVasylieva.github.io/react_phone-catalog/"
            className={getClassNames}
          >
            Contacts
          </NavLink>

          <NavLink
            to="https://HannaVasylieva.github.io/react_phone-catalog/"
            className={getClassNames}
          >
            Rights
          </NavLink>
        </div>

        {!isCartPage && (
          <div className="footer__back">
            <span className="footer__text">Back to top</span>
            <button
              type="button"
              className="footer__back-btn"
              onClick={scrollToTop}
            >
              <img src="images/TopBtn.svg" alt="BackToTop" />
            </button>
          </div>
        )}

      </div>
    </footer>
  );
};
