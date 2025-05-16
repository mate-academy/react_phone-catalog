import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

export const Footer: React.FC = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className={style.footer}>
        <Link to="/">
          <img src="img/Logo.png" alt="Logo" className={style.logo} />
        </Link>
        <Link to="https://github.com/ogchy">
          <p className={style.links}>GitHub</p>
        </Link>
        <Link to="/">
          <p className={style.links}>Contacts</p>
        </Link>
        <Link to="/">
          <p className={style.links}>Rights</p>
        </Link>
        <div className={style.top}>
          <p className={style.back_to_top}>Back to top</p>
          <button className={style.button}>
            <img src="img/Arrow-left.png" alt="arrow-up" onClick={backToTop} />
          </button>
        </div>
      </footer>
    </>
  );
};
