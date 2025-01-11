import { ArrowIcon } from '../../HomePage/constants/icons';
import { Container } from '../Container/Container';
import { IconButton } from '../IconButton';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__content}>
          <img
            src="react_phone-catalog/img/logo/logo-footer.png"
            alt="Nice Gadgets logo"
            className={styles.logo}
          />
          <ul className={styles.linkList}>
            {['Github', 'Contacts', 'rights'].map(label => (
              <li key={label} className={styles.listItem}>
                <a
                  href="https://OleksandraKoshyk.github.io/react_phone-catalog/"
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.backToTop}>
            <div className={styles.backToTop__label}>Back to top</div>
            <IconButton
              direction="up"
              onClick={scrollToTop}
              icon={<ArrowIcon />}
              disabled={false}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};
