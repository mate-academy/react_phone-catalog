import { Link } from 'react-router-dom';

export const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        <img
          src="./img/icons/footer-logo.svg"
          alt="Logo"
          className="footer__logo__img"
        />
      </Link>
      <ul className="footer__list">
        <li className="footer__item">
          <Link
            to="https://github.com/GoVolodya"
            target="_blank"
            className="footer__item__link"
          >
            Github
          </Link>
        </li>
        <li className="footer__item">
          <Link
            to="https://github.com/GoVolodya"
            target="_blank"
            className="footer__item__link"
          >
            Contacts
          </Link>
        </li>
        <li className="footer__item">
          <Link
            to="https://github.com/GoVolodya"
            target="_blank"
            className="footer__item__link"
          >
            Rights
          </Link>
        </li>
      </ul>
      <div className="footer__actions">
        <button className="footer__button" onClick={handleScrollTop}>
          <span className="footer__button__text">Back to top</span>
          <img
            src="./img/icons/arrow-top.svg"
            alt="To top"
            className="footer__button__icon"
          />
        </button>
      </div>
    </footer>
  );
};
