import React, { useState, useEffect } from 'react';
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
          <a href="#home">
            <img src={`${process.env.PUBLIC_URL}/img/Logo.svg`} alt="Logo" className="logo__image" />
          </a>
        </div>
        <div className="footer-section2">
          <ul>
            <li><a href="/github">GITHUB</a></li>
            <li><a href="/contacts">CONTACTS</a></li>
            <li><a href="/rights">RIGHTS</a></li>
          </ul>
        </div>
        <ScrollToTopButton />
      </div>
    </footer>
  );
};

export default Footer;
