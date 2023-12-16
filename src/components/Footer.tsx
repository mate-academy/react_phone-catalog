export const Footer = () => {
  const handleBacToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__logo">
        <img alt="log" src="./img/logo.svg" />
      </div>

      <div className="footer__links">
        <a
          href="https://github.com/Kozubowicz/react_phone-catalog"
          className="footer__links--item"
        >
          Github
        </a>
        <a
          href="/#"
          className="footer__links--item"
        >
          Contacts
        </a>
        <a
          href="/#"
          className="footer__links--item"
        >
          rights
        </a>
      </div>

      <span className="footer__back--label">Back to top</span>
      <button
        type="button"
        className="footer__back--button buttons"
        onClick={handleBacToTopButton}
      >
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="footer__back--button-image"
        />
      </button>

    </footer>
  );
};
