import { Link } from 'react-router-dom';
import { footerLinks } from './utils/footer_links';
import './Footer.scss';
export const Footer = () => {
  return (
    <footer className="wrapper">
      <div className="footer-section grid">
        <div className="left-section">
          <Link to={'#'}>
            <img src="/img/shared/logo.svg" alt="" />
          </Link>
        </div>
        <div className="middle-section">
          {footerLinks.map(item => (
            <Link key={item.id} to={item.to} className="footerLink">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="right-section">
          <a href={'#'} className="to-top-btn">
            Back to top
            <img src="/img/shared/next.svg" alt="" className="next-top" />
          </a>
        </div>
      </div>
    </footer>
  );
};
