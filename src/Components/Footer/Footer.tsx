import './Footer.scss';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <Logo />

          <ul className="footer__list">
            <li>
              <Link to="https://github.com/partnersinbahamas" className="footer__link" target="_blank">github</Link>
            </li>

            <li>
              <Link to="" className="footer__link" target="_blank">contacts</Link>
            </li>

            <li>
              <Link to="" className="footer__link" target="_blank">rights</Link>
            </li>
          </ul>

          <div className="footer__backTo">
            <p>Back to top</p>

            <button className="footer__button">
              <img src="Images/arrow-icon--left.svg" className="footer__button--icon" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
