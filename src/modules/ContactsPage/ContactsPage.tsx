import React, { useEffect } from 'react';
import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="h1">Contacts</h1>

      <div className={styles.content}>
        <p>Email: support@nicegadgets.com</p>
        <p>Phone: +380 (99) 123-45-67</p>
        <p>Address: Lviv, Ukraine</p>
      </div>
    </div>
  );
};
