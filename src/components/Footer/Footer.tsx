import LogoIcon from '../../images/icons/Logo.svg';
import './footer.scss';
import Arrow from '../../images/icons/arrow_right_small.svg';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <div>
            <a href="/" className="logo">
              <img src={LogoIcon} alt="Logo" className="logoImage" />
            </a>
          </div>

          <div className="footer__nav-block">

            <nav className="footer__nav">
              <ul className="footer__nav__bar">
                <li className="footer__nav__item">
                  <a href="/" className="footer__nav__link">Github</a>
                </li>
                <li className="footer__nav__item">
                  <a href="/" className="footer__nav__link">Contacts</a>
                </li>
                <li className="footer__nav__item">
                  <a href="/" className="footer__nav__link">rights</a>
                </li>
              </ul>
            </nav>

          </div>

          <div className="footer__btnContainer">
            <p className="footer__btnContainer__text">Back to top</p>
            <div className="footer__btnContainer__imgContainer">
              <img src={Arrow} alt=" arrow btn" className="footer__btnContainer__img" />
            </div>
          </div>
        </div>

      </div>

    </div>

  );
};
