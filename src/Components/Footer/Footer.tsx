import classNames from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { isMobile } = useContext(ProductContext);

  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="wrapped__container">
        <footer className="footer">
          <div
            className={classNames('footer__container', {
              'footer__container--mobile': isMobile,
            })}
          >
            <div className="footer__wrapper">
              <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                <div className="footer__icon"></div>
              </Link>
            </div>

            <div className="footer__links">
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/SlavaRevit"
                className="footer__links--item"
              >
                Github
              </a>
              <a href="" className="footer__links--item">
                Contacts
              </a>
              <a href="" className="footer__links--item">
                Right
              </a>
            </div>

            <div className="footer__back-wrapper">
              <p className="footer__back-wrapper__text">Back to top</p>
              <div
                className="footer__back-wrapper__button"
                onClick={handleBackToTop}
              >
                <button className="footer__back-wrapper__back"></button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
