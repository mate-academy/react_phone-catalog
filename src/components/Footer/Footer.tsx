import styles from'./Footer.module.scss';

const navigationFooter = ['GITHUB', 'CONTACTS', 'RIGHTS']
export const Footer = () => {

  return (

    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.nav__logo}>
        <a className={styles.nav__img} href="">
            <img src="https://allaserhiienko.github.io/react_phone-catalog//img/icons/logo.svg" alt="" />
          </a>
        </div>

        <ul className={styles.nav}>
          {navigationFooter.map(item => (
            <li
              key={item}
              className={styles.nav__item}
            >
              <a
                href=""
                className={styles.nav__link}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.footer__return}>
          <span className={styles.footer__hint}>
            Back to top
          </span>
          <button
            className={styles.footer__img}
          />
        </div>
      </div>
    </footer>
  );
};
