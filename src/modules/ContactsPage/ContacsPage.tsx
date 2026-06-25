import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ContactsPage.module.scss';

const PHONE_NUMBER = '+380951366986';
const PHONE_DISPLAY = '+38(095) 136-69-86';

export const ContactsPage: React.FC = () => (
  <main className={styles.main}>
    <Breadcrumbs crumbs={[{ label: 'Contacts' }]} />
    <h1 className={styles.title}>Contacts</h1>

    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.icon}>📞</span>
        <h2 className={styles.cardTitle}>Phone</h2>
        <a href={`tel:${PHONE_NUMBER}`} className={styles.link}>
          {PHONE_DISPLAY}
        </a>
      </div>

      <div className={styles.card}>
        <span className={styles.icon}>📧</span>
        <h2 className={styles.cardTitle}>Email</h2>
        <a href="mailto:support@nicegadgets.com" className={styles.link}>
          support@nicegadgets.com
        </a>
      </div>

      <div className={styles.card}>
        <span className={styles.icon}>💬</span>
        <h2 className={styles.cardTitle}>GitHub</h2>
        <a
          href="https://github.com/Skay9n/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          Skay9n/react_phone-catalog
        </a>
      </div>
    </div>
  </main>
);
