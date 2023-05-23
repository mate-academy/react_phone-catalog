import './FootNavigation.scss';
import logo from '../../Icons/logo.svg';

export const FootNavigation = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <a href="/" className="footer__logo">
          <img src={logo} alt="logo" />
        </a>

        <div className="footer__navigation">
          <a
            href="https://github.com/katerynashylina"
            target="_blank"
            className="footer__navigation--item footer__navigation--link"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://github.com/katerynashylina"
            target="_blank"
            className="footer__navigation--item footer__navigation--link"
            rel="noreferrer"
          >
            Contacts
          </a>
          <a
            href="https://github.com/katerynashylina"
            target="_blank"
            className="footer__navigation--item footer__navigation--link"
            rel="noreferrer"
          >
            rights
          </a>
        </div>

        <div className="footer__action">
          <a href="/" className="footer__action--text">
            Back to top
          </a>

          <a
            href="/"
            className="footer__navigation--link footer__action--container"
          >
            <div className="footer__action--img" />
          </a>
        </div>
      </div>
    </div>
  );
};
