import { useContext } from 'react';
import footerlogo from '../logo/logo.module.scss';
import footer from './Footer.module.scss';
import { CatalogContext } from '../CatalogProvider';

export const Footer = () => {
  const { themeSwitcher } = useContext(CatalogContext);

  return (
    <footer
      className={footer.footer}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <div className={footerlogo.logo__footer} />
      <nav className={footer.navigation}>
        <a href="https://github.com/robsza1122" className={footer.link}>
          GITHUB
        </a>
        <a href="https://github.com/robsza1122" className={footer.link}>
          CONTACTS
        </a>
        <a
          href="https://github.com/robsza1122/react_phone-catalog"
          className={footer.link}
        >
          RIGHTS
        </a>
      </nav>
      <div className={footer.backtotop}>
        <div className={footer.text}>Back to top</div>

        <button
          className={footer.linkarrow}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <div
            className={themeSwitcher ? footer.arrowONDARK : footer.arrow}
          ></div>
        </button>
      </div>
    </footer>
  );
};
