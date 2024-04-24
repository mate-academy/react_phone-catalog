// import './Footer.module.scss';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <img
        className="footer_logo"
        src="./img/logo/logo_phone_catalog.svg"
        alt="logo"
      />

      <div className="contacts">
        <div className="contacts_link">
          <a className="footer__link" href="#">
            GitHub
          </a>
        </div>

        <div className="contacts_link">
          <a className="footer__link" href="#">
            Contacts
          </a>
        </div>

        <div className="contacts_link">
          <a className="footer__link" href="#">
            Rights
          </a>
        </div>
      </div>

      <div className="on-top">
        <div className="on-top__text">Back to top</div>
        <button className="on-top__button">
          <img
            className="icon-up"
            src="./img/logo/logos/button-left-arrow.svg"
            alt="top"
          />
        </button>
      </div>
    </footer>
  );
};
