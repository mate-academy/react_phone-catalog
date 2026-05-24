import './Footer.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__img">
          <img src="./icons/Logo.png" alt="Nice-Gadgets-Logo" />
        </div>

        <div className="footer__links">
          <a
            href="https://github.com/ExtymAndriy?tab=repositories"
            className="footer__link"
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

        <button className="footer__up-link" onClick={handleScrollToTop}>
          <p>Back to top</p>
          <img src="./icons/Up.png" alt="Back to top arrow" />
        </button>
      </div>
    </footer>
  );
};
