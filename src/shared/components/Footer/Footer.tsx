import { Link } from 'react-router-dom';
import { footerLinks } from './utils/footer_links';
import './Footer.scss';
import { publicPath } from '../../utils/publicPath';

export const Footer = () => {
  return (
    <footer className="wrapper">
      <p className="tarot-link">
        Envie de prolonger la détente après votre séance ? <br />
        Le site <a href="https://tarot-magic.com/fr/daily-card">
          Tarot Magic
        </a>{' '}
        propose une carte du jour gratuite, sans inscription, pour se poser une
        question et y réfléchir en douceur.
      </p>
      <div className="footer-section grid">
        <div className="left-section">
          <Link to={'#'}>
            <img src={publicPath('img/shared/logo.svg')} alt="" />
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
            <img
              src={publicPath('img/shared/next.svg')}
              alt=""
              className="next-top"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
