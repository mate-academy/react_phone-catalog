import './Footer.scss';

export const Footer = () => {
  const handleScrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__img">
          <img src="./icons/logo.svg" alt="Nice-Gadgets-Logo" />
        </div>

        <div className="footer__links">
          <a
            href="https://github.com/AlexanderBarkar/react_phone-catalog"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a href="#" className="footer__link">
            Contacts
          </a>
          <a href="#" className="footer__link">
            Rights
          </a>
        </div>

        <a href="#" className="footer__up-link" onClick={handleScrollToTop}>
          <p>Back to top</p>
          <img src="./icons/arrow-up-white.svg" alt="up-logo" />
        </a>
      </div>
    </footer>
  );
};