import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Show the button when the user scrolls down
  const handleScroll = () => {
    const { scrollY } = window;

    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={`scroll-to-top footer-section3 ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <h2>Back to top</h2>
      <img
        src={`${process.env.PUBLIC_URL}/img/Chevron-right.svg`}
        alt="Chevron"
        className="footer-chevron"
        style={{ transform: 'rotate(-90deg)' }}
      />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section1">
          <NavLink to="/">
            <img src={`${process.env.PUBLIC_URL}/img/Logo.svg`} alt="Logo" className="logo__image" />
          </NavLink>
        </div>
        <div className="footer-section2">
          <ul>
            <li>
              <NavLink
                to="https://github.com/petrolozynskyi"
              >
                GITHUB
              </NavLink>

            </li>
            <li>
              <NavLink
                to="https://github.com/petrolozynskyi"
              >
                CONTACTS
              </NavLink>

            </li>
            <li>
              <NavLink
                to="https://github.com/petrolozynskyi"
              >
                RIGHTS
              </NavLink>

            </li>
          </ul>
        </div>
        <ScrollToTopButton />
      </div>
    </footer>
  );
};

export default Footer;
