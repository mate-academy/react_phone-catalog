
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => {
  return (
    <div className="footerBlock">
      <div className='footer-container'>
        <div className="logoContainer">
          <Link to="/" className="footer-logo-link">
            <img
              src="/img/logo/logo.svg"
              alt="Company logo"
              className="logo footer-logo"
            />
          </Link>
        </div>

        <div className="footerLinks">
          <Link to='/' className='link'>Github</Link>
          <Link to='/' className='link'>Contacts</Link>
          <Link to='/' className='link'>Rights</Link>
        </div>

        <div className="backToTop-container">
          <div className='button-name'>
            Back to top
          </div>

          <div className='button has-shadow-cursor'>
            <img
                src="/img/icons/ArrowTop.svg"
                alt="Arrow Top"
                className="arrowTop"
              />
          </div>
        </div>
      </div>
    </div>
  );
};
