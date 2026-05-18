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
          <img src="public/icons/logo.svg" alt="Nice-Gadgets-Logo" />
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

        <a href="#" className="footer__up-link" onClick={handleScrollToTop}>
          <p>Back to top</p>
          <img src="public/icons/Up.svg" alt="public/icons/Up.svg" />
        </a>
      </div>
    </footer>
  );
};
