import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/img/logo.png`}
          alt="nice gadjets"
        />
        <ul className="footer__menu">
          <li className="footer__item">GITHUB</li>
          <li className="footer__item">CONTACTS</li>
          <li className="footer__item">RIGHTS</li>
        </ul>
        <a href="#" className="footer__back">
          <span className="footer__link">Back to top</span>
          <div className="footer__icon">
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/img/chevron-up.svg`}
              alt="chevron up"
            />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
