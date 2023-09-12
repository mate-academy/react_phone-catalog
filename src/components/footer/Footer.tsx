import './style.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__items">
        <a className="footer__logo" href="/">
          <img src="./img/icons/Logo.svg" alt="logo" />
        </a>

        <nav className="footer__content-mid">
          <a className="footer__content-mid-link" href="/">Github</a>
          <a className="footer__content-mid-link" href="/">Contacts</a>
          <a className="footer__content-mid-link" href="/">rights</a>
        </nav>

        <nav className="footer__content-right">
          <p className="footer__content-right-text">Back to top</p>
          <a className="footer__up" href="/">
            <img
              className="footer__up-back"
              src="./img/icons/chevron.png"
              alt="up"
            />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
