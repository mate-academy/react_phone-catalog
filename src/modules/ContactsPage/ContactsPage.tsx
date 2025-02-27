import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>📞 Contact Me</h1>

      <div className={styles.content}>
        <p>
          If you have any questions or collaboration ideas, feel free to reach
          out!
        </p>

        <ul>
          <li>
            📧 Email:{' '}
            <a href="mailto:eva.shavrukova@gmail.com">
              eva.shavrukova@gmail.com
            </a>
          </li>
          <li>
            🌐 LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/in/yevheniia-shavrukova"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/yevheniia-shavrukova
            </a>
          </li>
          <li>
            💻 GitHub:{' '}
            <a
              href="https://github.com/janeshavrukova"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/janeshavrukova
            </a>
          </li>
          <li>📍 Location: Vancouver, Canada</li>
          <li>
            ☎ Phone: <a href="tel:+17789551609">+1 (778) 955-1609</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
