import { Link } from 'react-router-dom';
import './Footer.scss';
import { getAssetUrl } from '../../utils/functions/function';

export const Footer = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <Link to="/" className="footer__logo" onClick={backToTop}>
        <img
          src={getAssetUrl('/img/logo.png')}
          alt="logo"
          className="footer__logo--img"
        />
      </Link>
      <div className="footer__links">
        <a
          href="https://github.com/mate-academy/react_phone-catalog"
          className="footer__links--text"
        >
          github
        </a>
        <div className="footer__links--text">contacts</div>
        <div className="footer__links--text">rights</div>
      </div>
      <div className="footer__return">
        <div className="footer__return--text" onClick={backToTop}>
          Back to top
        </div>
        <div className="footer__return--button" onClick={backToTop}>
          <img src={getAssetUrl('/img/arrow-up.png')} alt="arrow" />
        </div>
      </div>
    </div>
  );
};
