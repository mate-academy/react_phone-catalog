import styles from './ComponentFooter.module.scss';

const gitHub = 'https://github.com/roman-logos-frontend';

export const ComponentFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer>
      <div className={styles.container}>
        <a href="#" className={styles.container__logo}>
          <img src="./img/Logo.png" alt="NICE GADGETS" />
        </a>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a
                href={gitHub}
                target="_blank"
                className={styles.nav__link}
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className={styles.nav__item}>
              <a
                href={gitHub}
                target="_blank"
                className={styles.nav__link}
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </li>
            <li className={styles.nav__item}>
              <a
                href={gitHub}
                target="_blank"
                className={styles.nav__link}
                rel="noopener noreferrer"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.container__button}>
          <a className={styles.back} onClick={scrollToTop}>
            Back to top
          </a>
          <button className={styles.button} onClick={scrollToTop}>
            ^
          </button>
        </div>
      </div>
    </footer>
  );
};
