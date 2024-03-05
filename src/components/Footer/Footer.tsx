import './Footer.scss';

export const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__content">
        <a href="#/" className="Footer__logo">
          <img src="/icons/Logo.svg" alt="logo" />
        </a>

        <div className="Footer__nav">
          <a href="#/" className="Footer__nav-item">
            GITHUB
          </a>
          <a href="#/" className="Footer__nav-item">
            CONTACTS
          </a>
          <a href="#/" className="Footer__nav-item">
            RIGHTS
          </a>
        </div>

        <div className="Footer__buttonBack">
          <span className="Footer__ButtonBack-name">Back to top</span>
          <a href="#/" className="Footer__buttonBack-button">
            <img src="/icons/button_back.svg" alt="back to top" />
          </a>
        </div>
      </div>
    </div>
  );
};
