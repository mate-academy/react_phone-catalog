import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Link to="/">
        <div className="footer__logo"></div>
      </Link>

      <div className="footer__links">
        <a
          href="https://github.com/Yehorf21"
          className="footer__link footer__link--github"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="mailto:lenovozt3012@gmail.com"
          className="footer__link footer__link--contacts"
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>

        {/* not sure about what this link is about */}
        <a className="footer__link footer__link--rights">Rights</a>
      </div>

      <div className="footer__back-to-top">
        <div className="footer__text" onClick={scrollToTop}>
          Back to top
        </div>

        <button className="footer__arrow" onClick={scrollToTop} />
      </div>
    </>
  );
};
