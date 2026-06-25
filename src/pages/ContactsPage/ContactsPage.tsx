import classNames from 'classnames';
import styles from './ContactsPage.module.scss';
import mailIcon from '../../icons/mail.png';
import gitHub from '../../icons/github.png';

export const ContactsPage = () => (
  <main className={classNames('container', styles.contactsPage)}>
    <h1 className={classNames('font-h1', styles.title)}>Contacts</h1>

    <section className={styles.content}>
      <div className={styles.list}>
        <div className={styles.iconBox}>
          <img src={mailIcon} alt="" className={styles.icon} />
          <a href="mailto:freelinex7@gmail.com">freelinex7@gmail.com</a>
        </div>

        <div className={styles.iconBox}>
          <img src={gitHub} alt="" className={styles.icon} />
          <a
            href="https://github.com/freelinex"
            target="_blank"
            rel="noreferrer"
          >
            freelinex
          </a>
        </div>
      </div>
    </section>
  </main>
);
