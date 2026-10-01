import Logo from '../Logo';

import styles from './Footer.module.scss';

type Props = {
  navigate: (to: string) => void;
};

export default function Footer({ navigate }: Props) {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo onClick={() => navigate('/')} />

        <div className={styles.links}>
          <a
            href="https://github.com/Artroller/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a href="#contacts">Contacts</a>

          <a href="#rights">Rights</a>
        </div>

        <button className={styles.back} type="button" onClick={scrollTop}>
          Back to top
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
}
