import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="footer">
    <Link to="/" className="logo" />

    <nav className="nav footer__nav">
      <a href="/" className="nav__link">GITHUB</a>
      <a href="/" className="nav__link">CONTACTS</a>
      <a href="/" className="nav__link">RIGHTS</a>
    </nav>

    <div className="footer__up-button-container">
      <p className="nav__link">Back to top</p>
      <button
        type="button"
        className="footer__up-button"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        { }
      </button>
    </div>
  </footer>
);
