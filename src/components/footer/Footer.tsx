import { ArrowDirections } from '../../helpers/enums/ArrowDirections';
import { Arrow } from '../Arrow';
import { Logo } from '../Logo';

type FooterProps = {
  hasTopNav?: boolean
};

export const Footer = ({ hasTopNav = true }: FooterProps) => {
  const handleClick = () => window.scrollTo(1440, 0);

  return (
    <footer className="home__footer footer">
      <div className="footer__left">
        <Logo imageClasses="footer__logo logo" />

        <div className="footer__links">
          <a
            className="footer__link"
            // eslint-disable-next-line max-len
            href="https://github.com/AmadeuszAndroid/react_phone-catalog/tree/develop"
          >
            Github
          </a>

          <a className="footer__link" href="#/">Contacts</a>

          <a className="footer__link" href="#/">rights</a>
        </div>
      </div>

      {hasTopNav && (
        <nav className="footer__top-nav">
          <button
            className="footer__top-link-text"
            type="button"
            onClick={handleClick}
          >
            Back to top
          </button>

          <Arrow
            direction={ArrowDirections.top}
            onClick={handleClick}
          />
        </nav>
      )}
    </footer>
  );
};

Footer.defaultProps = {
  hasTopNav: true,
};
