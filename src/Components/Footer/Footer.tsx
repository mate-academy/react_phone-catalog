import footerlogo from '../logo/logo.module.scss';
import footer from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={footer.footer}>
      <button onClick={() => localStorage.clear()}>Clear locale Storage</button>
      <div className={footerlogo.logo__footer} />
      <nav className={footer.footer__navigation}>
        <a
          href="https://github.com/robsza1122/react_phone-catalog"
          className={footer.footer__link}
        >
          GITHUB
        </a>
        <a href="" className={footer.footer__link}>
          CONTACTS
        </a>
        <a href="" className={footer.footer__link}>
          RIGHTS
        </a>
      </nav>
      <div className={footer.footer__backtotop}>
        <div className={footer.footer__text}>Back to top</div>

        <button
          className={footer.footer__linkarrow}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <div className={footer.footer__arrow}></div>
        </button>
      </div>
    </footer>
  );
};
