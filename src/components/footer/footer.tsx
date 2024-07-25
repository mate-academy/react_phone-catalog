import { Link } from 'react-router-dom';
import logo from '../../img/icons/logo.svg';

export const Footer = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <footer className="footer__container">
        <Link className="footer__logo" to={'/'}>
          <img src={logo} alt="logo" />
        </Link>
        <div className="footer__links">
          <Link
            className="footer__link"
            to={'https://github.com/kapesha'}
          >
            GitHUB
          </Link>
          <Link className="footer__link" to={'https://github.com/kapesha'}>
            Contacts
          </Link>
          <Link className="footer__link" to={'https://github.com/kapesha'}>
            Rights
          </Link>
        </div>
        <button className="footer__up">
          <p onClick={goTop} className="footer__button-text">
            Back to top
          </p>
          <button onClick={goTop} className="button-slider button-size b-up" />
        </button>
      </footer>
    </div>
  );
};
