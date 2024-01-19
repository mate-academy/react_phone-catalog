import { ArrowDirections } from '../../helpers/enums/ArrowDirections';
import { isBigScreen } from '../../helpers/functions/Functions';
import { Arrow } from '../Arrow';
import { BottomNavigation } from '../BottomNavigation';
import { Logo } from '../Logo';

type FooterProps = {
  hasTopNav?: boolean
};

export const Footer = ({ hasTopNav = true }: FooterProps) => {
  const handleClick = () => window.scrollTo(1440, 0);

  return (
    <footer className="home__footer footer">
      <div className="footer__left">
        <Logo imageExtraClass="footer__logo logo" />

        {isBigScreen() && <BottomNavigation />}
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
