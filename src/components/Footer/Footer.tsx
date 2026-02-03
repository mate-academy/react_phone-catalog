import styles from './style.module.scss';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_blocks}>
        <div className={styles.footer_blocks_image}>
          <img src="../../../public/img/icons/Logo.svg" alt="Logo" />
        </div>
        <nav className={`${styles.footer_blocks_info} text_uppercase`}>
          <a href="https://github.com/SeemsGood78/react_phone-catalog">
            Github
          </a>
          <a href="#contacts">Contacts</a>
          <a href="#rights">rights</a>
        </nav>
        <div className={styles.footer_blocks_buttons}>
          <span className="text_small">Back to top</span>
          <button onClick={scrollToTop}>
            <img
              src="../../../public/img/icons/Arrow(top).svg"
              alt="ArrowTop"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
