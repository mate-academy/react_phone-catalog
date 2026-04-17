import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: 'Rights & Legal' }]} />
      <h1 className={styles.title}>Rights & Legal</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Copyright</h2>
        <p>
          © {year} Nice Gadgets. All rights reserved. All content, trademarks,
          and brand identifiers on this site are the property of Nice Gadgets or
          their respective owners.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>License</h2>
        <p>
          This project is open-source and available under the{' '}
          <a
            href="https://opensource.org/licenses/MIT"
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>
          . You are free to use, copy, modify, and distribute this software with
          attribution.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Disclaimer</h2>
        <p>
          Product images and descriptions are provided for informational
          purposes only. Nice Gadgets is not responsible for typographical
          errors or inaccuracies in product specifications.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Privacy</h2>
        <p>
          We do not collect personal data beyond what is necessary to process
          your order. Cart and favorites data is stored locally in your browser
          and never shared with third parties.
        </p>
      </section>
    </div>
  );
};
