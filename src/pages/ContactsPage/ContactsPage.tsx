import classNames from 'classnames';
import styles from './ContactsPage.module.scss';

export const ContactsPage = () => (
  <main className={classNames('container', styles.contactsPage)}>
    <h1 className={classNames('font-h1', styles.title)}>Contacts</h1>

    <section className={styles.content}>
      <p className="font-body">
        Have questions about Nice Gadgets? Feel free to contact us.
      </p>

      <ul className={styles.list}>
        <li>
          Email:{' '}
          <a href="mailto:your-email@example.com">your-email@example.com</a>
        </li>

        <li>
          GitHub:{' '}
          <a
            href="https://github.com/MykolaFatkullin"
            target="_blank"
            rel="noreferrer"
          >
            MykolaFatkullin
          </a>
        </li>
      </ul>
    </section>
  </main>
);
