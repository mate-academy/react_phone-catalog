
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__logo}>
        <a href="" className={style.footer__link}>
          <img
            src="./img/logo/Logo.svg"
            alt=""
            className={style[`footer__logo__link--image`]}
          />
        </a>
      </div>

      <div className={style.footer__items}>
        <a
        href="https://github.com/Korochenko/react_phone-catalog"
        className={style.footer__items__link}
        target='_blank'
        >
          Github
        </a>
        <a href="" className={style.footer__items__link}>
          Contacts
        </a>
        <a href="" className={style.footer__items__link}>
          rights
        </a>
      </div>

      <div className={style.footer__backtotop}>
        <p className={style.footer__backtotop__name}>Back to top</p>
        <button
          className={style.footer__backtotop__button}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
        </button>
      </div>
    </footer>
  );
};
