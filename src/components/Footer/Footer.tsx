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
          href="https://github.com/BodyaRespect"
          className="footer__link footer__link--github"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="mailto:evilscortez@gmail.com"
          className="footer__link footer__link--contacts"
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>

        <a className="footer__link footer__link--rights">Rights</a>

        <div className="footer__back-to-top">
          <div className="footer__text" onClick={scrollToTop}>
            Back to top
          </div>

          <button className="footer__arrow" onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
};
