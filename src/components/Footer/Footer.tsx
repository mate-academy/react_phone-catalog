import styles from './Footer.module.scss';

const repositoryUrl = 'https://github.com/Banderos14/react_phone-catalog';
const contactsUrl = 'https://github.com/Banderos14';
const rightsUrl = `${repositoryUrl}/blob/develop/README.md`;

export const Footer = () => {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.logo}>Nice Gadgets</span>
        <nav className={styles.links}>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={contactsUrl} target="_blank" rel="noreferrer">
            Contacts
          </a>
          <a href={rightsUrl} target="_blank" rel="noreferrer">
            Rights
          </a>
        </nav>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
