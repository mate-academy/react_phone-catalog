import './Footer.scss';

export const Footer = () => {
  const scrollToTopSlowly = () => {
    const scrollStep = -window.scrollY / 75;
    const scroll = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="logo__container">
          <img className="logo" src="/imgForProject/Logo.png" alt="Logo" />
        </div>
        <div className="footer__container-text">
          <a
            className="github-link link"
            href="https://github.com/Andrew1256/react_phone-catalog"
          >
            <span className="text">GITHUB</span>
          </a>
          <a className="contacts-link link" href="tel:+380675274845">
            <span className="text">CONTACTS</span>
          </a>
          <a
            className="rights-link link"
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            <span className="text">RIGHTS</span>
          </a>
        </div>

        <div className="send-top">
          <span className="text__back-to-top">Back to top</span>
          <button className="button__back-to-top" onClick={scrollToTopSlowly}>
            <img src="/imgForProject/icon/Go-to-top.svg" alt="top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
