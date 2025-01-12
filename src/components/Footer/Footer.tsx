import { Link } from 'react-router-dom';
import Logo from '../Logo';
import style from './Footer.module.scss';
import React from 'react';

const Footer = () => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    const element = document.getElementById('header');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.wrapper}>
          <div className={style.logo}>
            <Logo />
          </div>

          <nav className={style.nav}>
            <ul className={style.items}>
              <li className={style.item}>
                <a
                  className={style.link}
                  href="https://github.com/boikoua"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className={style.item}>
                <a
                  className={style.link}
                  href="https://github.com/boikoua"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacts
                </a>
              </li>
              <li className={style.item}>
                <a
                  className={style.link}
                  href="https://github.com/boikoua"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rights
                </a>
              </li>
            </ul>
          </nav>

          <div className={style.back}>
            <span className={style.text}>Back to top</span>
            <Link to="/" className={style.btn} onClick={handleClick}>
              <img src="./img/icons/arrow-top.svg" alt="Arrow" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
