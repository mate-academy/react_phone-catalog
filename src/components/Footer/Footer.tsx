import { ICONS } from '../../icons';
import './Footer.scss';
import '../../utils/textStyles.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer_logo-box">
        <a href="#/" className="footer_logo">
          <img src={ICONS.logo} alt="Logo" />
        </a>
      </div>
      <div className="footer_links-block">
        <ul className="footer_list">
          <li className="footer_item">
            <a
              href="https://github.com/"
              rel="noreferrer"
              target="_blank"
              className="footer_link uppercase-text-style"
            >
              GITHUB
            </a>
          </li>
          <li className="footer_item">
            <a
              href="#contacts"
              className="footer_link uppercase-text-style"
            >
              CONTACTS
            </a>
          </li>
          <li className="footer_item">
            <a
              href="#rights"
              className="footer_link uppercase-text-style"
            >
              RIGHTS
            </a>
          </li>
        </ul>
      </div>
      <button
        type="button"
        className="footer_back-to-top-block"
        onClick={scrollToTop}
      >
        <p className="footer_back-to-top small-text-style">Back to top</p>
        <div className="footer_btn page-btns">
          <img src={ICONS.arrowUp} alt="Page scroll up" />
        </div>
      </button>
    </footer>
  );
};
