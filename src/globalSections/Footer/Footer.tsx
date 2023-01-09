import { LogoIcon } from 'src/components/Icons/LogoIcon';
import { PrevArrowIcon } from 'src/components/Icons/PrevArrowIcon';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

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
          <Link
            to="/"
            onClick={scrollHandler}
          >
            <LogoIcon />
          </Link>
        </div>

        <ul className="footer__links">
          <li className="footer__link--github footer__link">
            <a
              href="https://github.com/matvii1"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>

          <li className="footer__link--contact footer__link">
            <a
              href="https://t.me/matviiiiii"
              target="_blank"
              rel="noreferrer"
            >
              Contact
            </a>
          </li>

          <li className="footer__link--rights footer__link">
            <Link to="/">Rights</Link>
          </li>
        </ul>

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
