import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src="img/ui-kit/Header-logo.png" alt="header__logo" />
      </div>

      <div className="footer__nav--links">
        <a className="footer__nav--link" href={'https://github.com/romkaqb'}>
          github
        </a>
        <a
          className="footer__nav--link"
          href={'https://www.linkedin.com/in/roman-rusin-866aa4322/'}
        >
          contacts
        </a>
        <a className="footer__nav--link" href={'https://mate.academy/home'}>
          rights
        </a>
      </div>

      <a
        className="back-to-top--link"
        href="#"
        onClick={e => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="footer__nav--icons">
          <p>back to top</p>
          <img
            src="img/ui-kit/Slider-button-small-top.png"
            alt="favorites-icon"
          />
        </div>
      </a>
    </div>
  );
};
