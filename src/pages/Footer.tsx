import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/icons/LOGO.svg';
import { ReactComponent as ArrowTop }
  from '../assets/images/icons/arrow-top.svg';
import SquareButton from '../components/SquareButton';

const Footer = () => {
  const srollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className="footer"
    >
      <div className="footer__container">
        <Link
          to="/"
          className=""
        >
          <Logo className="footer__img" />
        </Link>
        <div className="footer__contacts">
          <a href="#/" className="footer__link">
            Gighub
          </a>
          <a href="#/" className="footer__link">
            Contacts
          </a>
          <a href="#/" className="footer__link">
            Rights
          </a>
        </div>
        <div className="footer__srcollTop">
          <p className="footer__srcollTop-name">
            Back to top
          </p>
          <SquareButton
            OnClick={srollTop}
          >
            <ArrowTop className="footer__img" />
          </SquareButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
