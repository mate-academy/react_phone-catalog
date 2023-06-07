import './FootNavigation.scss';
import logo from '../../Icons/logo.svg';
import { moveToTop } from '../../helpers/movingToTop';

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
          <button
            type="button"
            className="footer__action--text"
            onClick={moveToTop}
          >
            Back to top
          </button>

          <button
            type="button"
            className="footer__navigation--link footer__action--container"
            onClick={moveToTop}
          >
            <div className="footer__action--img" />
          </button>
        </div>
      </div>
    </div>
  );
};
