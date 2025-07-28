import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img
          src="./public/img/logo.png"
          alt="logo"
          className="footer__logo--img"
        />
      </div>
      <div className="footer__links">
        <div className="footer__links--text">github</div>
        <div className="footer__links--text">contacts</div>
        <div className="footer__links--text">rights</div>
      </div>
      <div className="footer__return">
        <div className="footer__return--text">Back to top</div>
        <div className="footer__return--button">
          <img src="../../../public/img/arrow-up.png" alt="arrow" />
        </div>
      </div>
    </div>
  );
};
