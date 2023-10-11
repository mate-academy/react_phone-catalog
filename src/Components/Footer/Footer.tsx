import React, { useState, useEffect } from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

const contacts = 'https://www.linkedin.com/in/andriiyelieva/';
const gitHub = 'https://github.com/AndriiYelieva';

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="container__logo" />
        <div className="container__description">
          <a
            className="container__link"
            href={gitHub}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="container__link"
            href={contacts}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>
          <Link
            className="container__link"
            to="/Rights"
          >
            Rights
          </Link>
        </div>

        {isVisible ? (
          <div className="container__button">
            <p className="container__button--text">Back to top</p>

            <button
              type="button"
              className="container__button--arrow"
              aria-label="Mute volume"
              onClick={scrollToTop}
            />
          </div>
        )
          : (<div className="container__button--fake" />)}
      </div>
    </footer>
  );
};
