import styles from './NavBar.module.scss';
export const NavBar = () => {
  return (
    <div className={styles.top__bar}>
      <a href="#">
        <img src="/img/niceLogo.svg" alt="NiceGadgetLogo"></img>
      </a>
      <a href="#menu" className={`${styles.icon} ${styles['icon--top']}`}>
        <img src="/img/Menu.svg" alt="menu"></img>
      </a>
    </div>
  );
};
