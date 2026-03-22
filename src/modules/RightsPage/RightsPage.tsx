import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './RightsPage.module.scss';

export const RightsPage: React.FC = () => (
  <main className={styles.main}>
    <Breadcrumbs crumbs={[{ label: 'Rights' }]} />
    <h1 className={styles.title}>Rights & Legal</h1>

    <div className={styles.sections}>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>© 2024 Nice Gadgets</h2>
        <p className={styles.text}>
          All content on this website, including text, graphics, logos, and
          images, is the property of Nice Gadgets and is protected by applicable
          copyright laws. Unauthorized use or reproduction of any content is
          strictly prohibited.
        </p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Disclaimer</h2>
        <p className={styles.text}>
          This is a demo project built for educational purposes. All product
          names, logos, and brands are property of their respective owners. All
          company, product, and service names used in this website are for
          identification purposes only. Use of these names does not imply any
          endorsement.
        </p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Open Source License</h2>
        <p className={styles.text}>
          This project is open source and available on{' '}
          <a
            href="https://github.com/Skay9n/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            GitHub
          </a>{' '}
          under the GPL-3.0 license. You are free to use, modify, and distribute
          this code in accordance with the license terms.
        </p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Privacy</h2>
        <p className={styles.text}>
          We do not collect or store any personal data. Cart and favourites data
          are stored locally in your browser and are never sent to any server.
        </p>
      </section>
    </div>
  </main>
);
