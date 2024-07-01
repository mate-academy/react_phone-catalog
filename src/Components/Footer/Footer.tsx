import './Footer.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';

export const Footer = () => {
  const { isMobile } = useContext(ProductContext);

  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <footer className="footer">
        <div
          className={classNames('footer__container ', {
            'footer__container--mobile': isMobile,
          })}
        >
          <div className="footer__wrapper">
            <div className="footer__icon"></div>
          </div>

          <div className="footer__links">
            <a href="" className="footer__links--item">
              Github
            </a>
            <a href="" className="footer__links--item">
              Contacts
            </a>
            <a href="" className="footer__links--item">
              Right
            </a>
          </div>
          <div className="footer__back-wrapper" onClick={handleBackToTop}>
            <p className="footer__back-wrapper__text">Back to top</p>
            <div className="footer__back-wrapper__button">
              <button className="footer__back-wrapper__back"></button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
