/* eslint-disable max-len */

import { Link } from 'react-router-dom';
import './Footer.scss';
import { Grid } from '../PageGrid/Grid';

export const Footer = () => {
  return (
    <footer className="footer">
      <Grid>
        <div className="footer__content">
          <section className="logo">
            <Link to={'/'}>
              <img
                className="logo__img"
                src="../img/Logo.png"
                alt="NICE GADGETS LOGO"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              />
            </Link>
          </section>

          <section className="contacts">
            <a href="https://github.com/OSI634" className="contacts__github">
              github
            </a>
            <a className="contacts__link">contacts</a>
            <div className="contacts__rights">rights</div>
          </section>

          <section className="to-top">
            <div className="to-top__text">Back to top</div>

            <button
              className="to-top__button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              <svg
                className="to-top__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  className="to-top__button--path"
                  d="M0.195262 5.13807C-0.0650873 4.87772 -0.0650873 4.45561 0.195262 4.19526L4.19526 0.195262C4.45561 -0.0650877 4.87772 -0.0650876 5.13807 0.195262L9.13807 4.19526C9.39842 4.45561 9.39842 4.87772 9.13807 5.13807C8.87772 5.39842 8.45561 5.39842 8.19526 5.13807L4.66667 1.60948L1.13807 5.13807C0.877722 5.39842 0.455612 5.39842 0.195262 5.13807Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </section>
        </div>
      </Grid>
    </footer>
  );
};
