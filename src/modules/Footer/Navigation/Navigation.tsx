import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <div className={styles.footer__navigation}>
      <nav>
        <ul className={styles.footer__list}>
          <li className="footer__item">
            <a
              href="https://github.com/VitaliiNez"
              target="_blank"
              className={styles.footer__link}
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/VitaliiNez"
              target="_blank"
              className={styles.footer__link}
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/VitaliiNez"
              target="_blank"
              className={styles.footer__link}
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
