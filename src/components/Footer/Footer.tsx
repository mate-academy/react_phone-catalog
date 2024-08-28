import './Footer.scss';

export const Footer = () => {
  function handleScroll() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="footer-container">
      <div className="footer-block">
        <a href="/" target="_self" className="footer-logo">
          <img src="./uploadedImg/logo.png" alt="Logo"></img>
        </a>

        <ul className="footer-links">
          <li>
            <a
              href="https://github.com/Stepan-R/react_phone-catalog"
              className="footer-link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="mailto:stepan.rad16.01@ukr.net"
              className="footer-link"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li>
            <a
              href="mailto:stepan.rad16.01@ukr.net"
              className="footer-link"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>

        <div className="footer-back-btn-bl">
          <p className="footer-back-p">Back to top</p>
          <button className="footer-UpArrow" onClick={handleScroll}>
            <img src="./uploadedImg/UpArrow.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
