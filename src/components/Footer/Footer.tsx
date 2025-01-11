import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import { CircleButton } from '../CircleButton';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const copyrightLinks = [
    {
      link: 'https://github.com/ly-manka',
      name: 'Github',
    },
    {
      link: 'https://github.com/ly-manka',
      name: 'Contacts',
    },
    {
      link: 'https://github.com/ly-manka',
      name: 'Rights',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__logo} onClick={scrollToTop}>
          <Logo isBig />
        </div>

        <ul className={styles.footer__list}>
          {copyrightLinks.map(item => (
            <li className={styles.footer__item} key={item.name}>
              <a
                href={item.link}
                target="_blank"
                className={styles.footer__link}
                rel="noreferrer"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.footer__elevator}>
          <div className={styles['footer__to-top']} onClick={scrollToTop}>
            <div className={styles['footer__to-top-text']}>Back to top</div>
            <CircleButton type="arrow-up" />
          </div>
        </div>
      </div>
    </footer>
  );
};
