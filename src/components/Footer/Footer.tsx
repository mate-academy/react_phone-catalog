import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <img
          className="footer__logo logo"
          src="../images/logo.svg"
          alt="logo2"
        />
        <ul className="footer__links">
          <li className="footer__link">github</li>
          <li className="footer__link">contacts</li>
          <li className="footer__link">rights</li>
        </ul>
        <div className="footer__topbtn">
          <label htmlFor="upbtn" className="footer__topbtn-label">
            Back to top
          </label>
          {/* <button id="upbtn" className="footer__topbtn-button"> */}
          <i className="ico ico-up" />
          {/* </button> */}
        </div>
      </div>
    </footer>
  );
};
