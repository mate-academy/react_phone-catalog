import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/img/servic/Logo.png" alt="logo" />
      </div>
      <div>
        <ul className={styles.navigate}>
          <li>
            <a href="https://github.com/AndreaBoiko" target="_blanc">
              Github
            </a>
          </li>
          <li>
            <Link to="/">Contacts</Link>
          </li>
          <li>
            <Link to="/">Rights</Link>
          </li>
        </ul>
      </div>
      <div className={styles.goTop}>
        <p>Back to top</p>
        <button onClick={scrollToTop}>
          <img src="/img/servic/arrow-top.svg" alt="arrow" />
        </button>
      </div>
    </div>
  );
};
