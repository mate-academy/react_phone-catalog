import { Logo } from '../Logo/logo';

export const Footer = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="footer">
      <div className="footer__container">
        <Logo classN={'logo__footer'} backToTop={backToTop} />
        <div className="footer__nav-list">
          <a
            href="https://github.com/Daryna-Kukharets"
            target="_blank"
            className="footer__nav-text"
            rel="noopener noreferrer"
          >
            Github
          </a>

          <a
            href="mailto:darinakuharec61.gmail.com"
            target="_blank"
            className="footer__nav-text"
            rel="noopener noreferrer"
          >
            Contacts
          </a>

          <a
            href="https://github.com/Daryna-Kukharets"
            target="_blank"
            className="footer__nav-text"
            rel="noopener noreferrer"
          >
            Rights
          </a>
        </div>
        <div className="footer__back-box">
          <p className="footer__back-text" onClick={backToTop}>
            Back to top
          </p>
          <button className="footer__button icon" onClick={backToTop}>
            <img
              src="img/icons/arrow-top.svg"
              alt="arrow top"
              className="icon__img"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
