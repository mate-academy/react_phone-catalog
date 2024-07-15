import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-block">
        <a href="/" target="_self" className="footer-logo">
          <img src="./uploadedImg/logo.png" alt="Logo"></img>
        </a>

        <ul className="footer-links">
          <li>
            <a href="/" className="footer-link">
              Github
            </a>
          </li>
          <li>
            <a href="/" className="footer-link">
              Contacts
            </a>
          </li>
          <li>
            <a href="/" className="footer-link">
              Rights
            </a>
          </li>
        </ul>

        <div className="footer-back-btn-bl">
          <p className="footer-back-p">Back to top</p>
          <a href="/" className="footer-UpArrow" target="_self">
            <img src="./uploadedImg/UpArrow.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
};
