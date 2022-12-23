import { LogoIcon } from 'components/Icons/LogoIcon';
import { PrevArrowIcon } from 'components/Icons/PrevArrowIcon';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  scrollToRef: React.RefObject<HTMLElement>,
};

export const Footer: FC<Props> = ({ scrollToRef }) => {
  const scrollHandler = () => {
    if (scrollToRef.current) {
      window.scrollTo({
        top: scrollToRef?.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer__logo">
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>

        <div className="footer__links">
          <div className="footer__link--github footer__link">
            Github
          </div>
          <div className="footer__link--contact footer__link">
            Contact
          </div>
          <div className="footer__link--rights footer__link">
            Rights
          </div>
        </div>

        <div
          className="footer__back-to-top"
          aria-hidden="true"
          onClick={scrollHandler}
        >
          <div className="footer__back-to-top__text">
            Back to top
          </div>
          <div
            className="footer__back-to-top__button"
          >
            <PrevArrowIcon />
          </div>
        </div>
      </footer>
    </div>
  );
};
