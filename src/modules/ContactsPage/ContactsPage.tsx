import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './ContactsPage.module.scss';

export const ContactsPage = () => {
  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: 'Contacts' }]} />
      <h1 className={styles.title}>Contacts</h1>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Our Store</h2>
          <p>123 Gadget Street</p>
          <p>Kyiv, 01001, Ukraine</p>
          <p>Mon – Fri: 9:00 – 20:00</p>
          <p>Sat – Sun: 10:00 – 18:00</p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Get in Touch</h2>
          <p>
            Email:{' '}
            <a href="mailto:support@nicegadgets.com" className={styles.link}>
              support@nicegadgets.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a href="tel:+380441234567" className={styles.link}>
              +38 (044) 123-45-67
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a
              href="https://github.com/redfield-mp/react_phone-catalog"
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              react_phone-catalog
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};
