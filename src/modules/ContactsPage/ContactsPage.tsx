import React, { useEffect } from 'react';
import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Contacts</h1>

      <div className={styles.content}>
        <p className={styles['body-text14']}>Email: support@nicegadgets.com</p>
        <p className={styles['body-text14']}>Phone: +380 (99) 123-45-67</p>
        <p className={styles['body-text14']}>Address: Lviv, Ukraine</p>
      </div>

      <div className={styles.copyright}>
        <p className={styles['small-text12Light']}>
          © 2026 Nice Gadgets. All rights reserved.
        </p>
      </div>
    </div>
  );
};
