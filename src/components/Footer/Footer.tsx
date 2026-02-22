import './Footer.module.scss';
import Logo from '../../../public/img/logo.svg';
import ToTop from '../../../public/img/icons/ArrowTop.svg';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer_wrapper">
            <img className="footer_img" src={Logo} alt="logo" />

            <div className="footer_menu">
              <ul className="footer_menu_list">
                <li className="footer_menu_item">
                  <a
                    className="footer_menu_link"
                    href="https://github.com/MOODDDII"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github
                  </a>
                </li>
                <li className="footer_menu_item">
                  <Link className="footer_menu_link" to="/">
                    contacts
                  </Link>
                </li>
                <li className="footer_menu_item">
                  <Link className="footer_menu_link" to="/">
                    rights
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer_btn">
              <p className="footer_btn_text" onClick={scrollToTop}>
                Back to top
              </p>
              <div className="footer_btn_to-top">
                <img
                  className="footer_btn_img"
                  src={ToTop}
                  alt="img"
                  onClick={scrollToTop}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
