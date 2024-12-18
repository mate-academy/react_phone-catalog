import { Link } from 'react-router-dom';
import './Footer.scss';
import { useEffect, useState } from 'react';

export const Footer: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  // Функція, яка показує/ховає кнопку при скролі
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Функція для прокрутки до верху сторінки
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <Link to="/" className="footer__link-logo">
        <img src="./img/icons/Logo.png" alt="Nice gadgets" className="footer__logo" />
      </Link>
      <nav className="nav_bar footer__nav-bar">
        <a href="https://github.com/GTXtab" className="nav-bar__link">
          GitHub
        </a>
        <a href="https://www.instagram.com/gtxtab/" className="nav-bar__link">
          Contacts
        </a>
        <a href="#" className="nav-bar__link">
          Rights
        </a>
      </nav>
      {showButton && (
        <div className="footer__nav-up" onClick={scrollToTop}>
          <p className="footer__nav-up--subtitle">Back to top</p>
          <button className="footer__button"></button>
        </div>
      )}
    </footer>
  );
};
