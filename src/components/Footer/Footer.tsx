import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';
import classNames from 'classnames';
import { useEffect } from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) => 
  classNames('footer__nav-link', {
  'footer-active': isActive,
});

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScrollToTop = () => {
      scrollToTop();
    };

    const backToTopButton = document.querySelector('.backto__top');

    if (backToTopButton) {
      backToTopButton.addEventListener('click', handleScrollToTop);

      return () => {
        backToTopButton.removeEventListener('click', handleScrollToTop);
      };
    }

    return () => {};
  }, []);

  return (
    <>
      <div className="border" />

      <div className="footer">
        <div className="footer__nav">
          <Link to="/">
            <div className="header__nav-logo" />
          </Link>

          <ul className="footer__nav-item">
            <li className="footer__nav-list">
              <NavLink
                to="https://github.com/Vitalii-Fediaiev"
                className={getLinkClass}
              >
                GitHub
              </NavLink>
            </li>

            <li className="footer__nav-list">
              <NavLink
                to="/"
                className={getLinkClass}
              >
                Contacts
              </NavLink>
            </li>

            <li className="footer__nav-list">
              <NavLink
                to="/"
                className={getLinkClass}
              >
                Right
              </NavLink>
            </li>
          </ul>

          <div className="footer__button">
            <p className="footer__button-name" aria-label="BacktoTop">Back to top</p>
            <button type="button" className="footer__button-top" onClick={scrollToTop} />
          </div>
        </div>
      </div>
    </>
  );
};
