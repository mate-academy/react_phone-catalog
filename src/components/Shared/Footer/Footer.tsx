/* eslint-disable max-len */
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__left">
          <a className="footer__logo" href="#">
            <img src="./img/icons/Logo.svg" alt="Logo" />
          </a>
        </div>
        <div className="footer__center">
          <a
            href="https://github.com/diiyavol"
            className="footer__text"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          <a
            href="https://t.me/diiyavol"
            className="footer__text"
            target="_blank"
            rel="noreferrer"
          >
            contacts
          </a>
          <a
            href="https://www.linkedin.com/in/%D0%BD%D0%B8%D0%BA%D0%B8%D1%82%D0%B0-%D0%BD%D0%B5%D1%81%D1%82%D0%B5%D1%80%D0%B5%D0%BD%D0%BA%D0%BE-a77a863b2/?isSelfProfile=true"
            className="footer__text"
            target="_blank"
            rel="noreferrer"
          >
            rights
          </a>
        </div>
        <div className="footer__right">
          <span className="footer__text--right">Back to top</span>
          <button onClick={scrollToTop} className="footer__button"></button>
        </div>
      </div>
    </footer>
  );
};
