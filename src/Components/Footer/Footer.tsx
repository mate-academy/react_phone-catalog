import '../icons/icon.scss';
import './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <button onClick={() => localStorage.clear()}>Clear locale Storage</button>
      <div className="logo__footer" />
      <nav className="footer__navigation">
        <a href="" className="footer__link">
          GITHUB
        </a>
        <a href="" className="footer__link">
          CONTACTS
        </a>
        <a href="" className="footer__link">
          RIGHTS
        </a>
      </nav>
      <div className="footer__back-to-top">
        <div className="footer__text">Back to top</div>

        <button
          className="footer__link-arrow"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <div className="footer__arrow"></div>
        </button>
      </div>
    </footer>
  );
};
