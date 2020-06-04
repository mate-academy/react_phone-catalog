import React, { useEffect, useState } from 'react';
import Logo from '../header/Logo/Logo';
import './Footer.scss';

const Footer = () => {
  const [scrollOn, setscrollOn] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setscrollOn(false);
  }, [scrollOn]);

  return (
    <footer className="footer">
      <div className="footer__nav">
        <Logo />
        <ul className="footer__nav-links">
          <li className="nav__item">
            <a className="nav__link hover-shadow hover-color animated" href="https://github.com/ShapovalDenys?tab=repositories">
              <span>G</span>
              <span>i</span>
              <span>t</span>
              <span>h</span>
              <span>u</span>
              <span>b</span>
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link hover-shadow hover-color animated" href="https://www.linkedin.com/in/denys-shapoval-831a74143/">
              <span>C</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
              <span>s</span>
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link hover-shadow hover-color animated" href="https://ru.wikipedia.org/wiki/All_rights_reserved">
              <span>r</span>
              <span>i</span>
              <span>g</span>
              <span>h</span>
              <span>t</span>
              <span>s</span>
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="back-to-top"
          onClick={() => setscrollOn(true)}
        >
          <img src="./img/backToTop.svg" alt="back to top" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
