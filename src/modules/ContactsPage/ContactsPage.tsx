import React from 'react';
import cl from 'classnames';

import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  return (
    <section className={cl('container', styles.section)}>
      <h1 className={styles.title}>Contacts</h1>

      <div className={styles.content}>
        <p className={styles.subtitle}>
          Welcome to the <b>Nice Gadgets</b> store! <br />
          This is a React portfolio project built by a Front-End Developer.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>GitHub</h3>
            <p className={styles.cardText}>
              Check out the source code and my other projects.
            </p>

            <a
              href="https://github.com/n7lots"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              github.com/n7lots
            </a>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Let`s talk</h3>
            <p className={styles.cardText}>
              I am open to new opportunities and exciting projects.
            </p>

            <a href="mailto:protocol222333@gmail.com" className={styles.link}>
              protocol222333@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
