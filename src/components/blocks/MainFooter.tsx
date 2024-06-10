import logo from '../../img/logo.png';

export const MainFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <img className="footer__logo" src={logo} alt="" />
      <ul className="footer__links">
        <li className="footer__link uppercase">
          <a href="#">Github</a>
        </li>
        <li className="footer__link uppercase">
          <a href="#">Contacts</a>
        </li>
        <li className="footer__link uppercase">
          <a href="#">Rights</a>
        </li>
      </ul>
      <a className="footer__to-top small-text" onClick={scrollToTop}>
        Back to top <span className="footer__to-top-button slide-button"></span>
      </a>
    </footer>
  );
};
