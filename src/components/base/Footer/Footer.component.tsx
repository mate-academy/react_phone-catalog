import { Icon } from '../Icon/Icon.component';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="../img/logo.svg" alt="Nice Gadgets logo" />
      </div>
      <nav className="footer__nav">
        <ul className="footer__nav-list">
          <li className="footer__nav-item">
            <a href="#" className="footer__nav-link">
              Github
            </a>
          </li>
          <li className="footer__nav-item">
            <a href="#" className="footer__nav-link">
              Contacts
            </a>
          </li>
          <li className="footer__nav-item">
            <a href="#" className="footer__nav-link">
              Rights
            </a>
          </li>
        </ul>
      </nav>
      <div className="footer__backTop">
        <span className="footer__backTop-text">Back to top</span>
        <a href="#top">
          <Icon
            iconType="chevron-up"
            iconUse="button"
            iconSize="32"
            border={true}
          />
        </a>
      </div>
    </footer>
  );
};
