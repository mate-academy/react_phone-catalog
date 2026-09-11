import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={style.footer}>
        <Link to={'/'}>
          <img
            className={style.footerimg}
            src={`${import.meta.env.BASE_URL}/img/Nice-Gadgets.svg`}
            alt="Logo"
          />
        </Link>
        <ul className={style.footerlist}>
          <li className={style.footerListItem}>
            <a
              target="_blank"
              rel="noreferrer noopener"
              className={style.footerLink}
              href={'https://github.com/LimeRider'}
            >
              Github
            </a>
          </li>
          <li className={style.footerListItem}>
            <a className={style.footerLink} href={'tel:+380123456789'}>
              Contacts
            </a>
          </li>
          <li className={style.footerListItem}>
            <a className={style.footerLink} href={'/'}>
              rights
            </a>
          </li>
        </ul>
        <div className={style.backToTop}>
          <p className={style.backToTopText}>Back to top</p>
          <button
            className={style.buttonbackToTop}
            onClick={scrollToTop}
            title="Up"
          >
            ^
          </button>
        </div>
      </div>
    </>
  );
};
