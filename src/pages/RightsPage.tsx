import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.text}>Made by Ihor Shtoiko</h1>
      <a
        href="https://www.linkedin.com/in/ihorshtoikodev/"
        target="_blank"
        rel="noreferrer"
        className={styles.listLink}
      >
        My Contacts
      </a>
    </div>
  );
};
