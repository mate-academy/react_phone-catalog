import React, { useState, useEffect } from 'react';
import '../style/main.scss';

const contacts = 'https://www.instagram.com/andrew_yelieva/';
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
          >
            Github
          </a>
          <a
            className="container__link"
            href={contacts}
          >
            Contacts
          </a>
          <a
            className="container__link"
            href={gitHub}
          >
            Rights
          </a>
        </div>

        <div className="container__button">
          <p className="container__button--text">Back to top</p>

          {isVisible && (
            <button
              type="button"
              className="container__button--arrow"
              aria-label="Mute volume"
              onClick={scrollToTop}
            />
          )}
        </div>
      </div>
    </footer>
  );
};
