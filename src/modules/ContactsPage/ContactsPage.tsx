import styles from './ContactsPage.module.scss';

export const ContactsPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Contacts</h1>
      <p className={styles.page__text}>
        This is a placeholder for the contacts page.
        <br />
        Feel free to reach out to our support team!
      </p>
    </div>
  );
};
