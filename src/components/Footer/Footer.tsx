import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.main}>
      <div>
        <img src="img/logo/Logo_desktop.svg" alt="" />
      </div>
      <div className={styles.main_links}>
        <a href="">Github</a>
        <a href="">Contacts</a>
        <a href="">rights</a>
      </div>
      <div className={styles.main_backTo}>
        <p>Back to top</p>
        <button>
          <img src="img/buttons/Arrow_Top.svg" alt="" />
        </button>
      </div>
    </div>
  );
};
