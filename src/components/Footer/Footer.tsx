import Logo from '../Logo/Logo';
import style from './footer.module.scss';

export const Footer = () => {
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
                    <a className={style.link} href="#">
                      Github
                    </a>
                  </li>
                  <li>
                    <a className={style.link} href="#">
                      Contacts
                    </a>
                  </li>
                  <li>
                    <a className={style.link} href="#">
                      rights
                    </a>
                  </li>
                </ul>
              </div>
              <div className={style.bottom}>
                <button className={style.button}>
                  Back to top <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
