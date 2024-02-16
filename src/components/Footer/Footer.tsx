import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../../icons/logo.svg";

export const Footer = () => {
  const goToTop = () => {
    const scrollToTop = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
      }
    };

    scrollToTop();
  };

  return (
    <div className="footer">
      <div className="footer__container main main__container">
        <Link to="/" className="footer__logo">
          <img src={logo} alt="footer-logo" className="footer__logo--img" />
        </Link>

        <div className="footer__nav">
          <Link
            to="https://github.com/Liubomyr19"
            className="footer__nav--link"
            target="_blank"
          >
            Github
          </Link>

          <Link
            to="https://github.com/Liubomyr19"
            className="footer__nav--link"
            target="_blank"
          >
            Contacts
          </Link>

          <Link
            to="https://github.com/Liubomyr19"
            className="footer__nav--link"
            target="_blank"
          >
            Rights
          </Link>
        </div>

        <button className="footer__backToTop" type="button" onClick={goToTop}>
          <p className="footer__backToTop--message">Back to top</p>
          <div className="footer__backToTop--btn">
            <div className="icon icon--toTop" />
          </div>
        </button>
      </div>
    </div>
  );
};
