import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import style from './footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer className="footer">
        <div className={style.wrapper}>
          <div className="container">
            <div className={style.items}>
              <div className={style.logo}>
                <Logo />
              </div>
              <div className={style.nav}>
                <ul>
                  <li>
                    <Link
                      className={style.link}
                      to={'https://github.com/backstage2000'}
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link className={style.link} to={'.'}>
                      {t('page.Contacts')}
                    </Link>
                  </li>
                  <li>
                    <Link className={style.link} to=".">
                      {t('page.rights')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                  });
                }}
                className={style.bottom}
              >
                <button className={style.button}>
                  {t('page.backTop')} <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
