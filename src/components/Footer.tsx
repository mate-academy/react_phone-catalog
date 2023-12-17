import { Link } from 'react-router-dom';

export const Footer = () => {
  const handleBacToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        <img alt="log" src="./img/logo.svg" />
      </Link>

      <div className="footer__links">
        <a
          href="https://github.com/Kozubowicz/react_phone-catalog"
          className="footer__links--item Uppercase"
        >
          Github
        </a>
        <a
          href="/#"
          className="footer__links--item Uppercase"
        >
          Contacts
        </a>
        <a
          href="/#"
          className="footer__links--item Uppercase"
        >
          rights
        </a>
      </div>

      <span className="footer__back--label SmallText">Back to top</span>
      <button
        type="button"
        className="footer__back--button buttons"
        onClick={handleBacToTopButton}
      >
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="footer__back--button-image"
        />
      </button>

    </footer>
  );
};
