import { type FC } from 'react';
import { GoBackButton } from '../../components/GoBackButton';
import styles from './RightsPage.module.scss';

export const RightsPage: FC = () => {
  return (
    <div className={styles.rightsPage}>
      <div className={styles.back}>
        <GoBackButton />
      </div>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <p className={styles.description}>
        By using this website, you agree to the following terms and policies.
        Please read them carefully before using the site.
      </p>
      <section>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>1. Ownership and Copyright</h2>
            <p className={styles.text}>
              All materials posted on the site, including text, graphics,
              images, logos, design, software, trademarks, domain names and
              other content elements, are the property of JS Ninjas team and are
              protected by copyright and intellectual property laws.
            </p>
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>2. Use of materials</h2>
            <p className={styles.text}>
              You have the right to view, download or print materials from the
              website only for personal, non-commercial use. All other forms of
              use of materials, including copying, distribution, publication or
              sale, are prohibited without prior written consent.
            </p>
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>3. Copy protection</h2>
            <p className={styles.text}>
              The materials on this site are protected from unauthorized
              copying. The use of automatic scripts, bots or other means to
              collect or copy materials without permission is a violation of the
              terms of use.
            </p>
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>4. Privacy Policy</h2>
            <p className={styles.text}>
              We care about your privacy. We do not use or store any of your
              Personal Data on the website, except for data about orders and
              favourite products on this website.
            </p>
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>5. Changes and Updates</h2>
            <p className={styles.text}>
              We reserve the right to change or update these terms at any time.
              Any changes will be effective upon posting on the site. We
              recommend that you periodically review these terms to stay
              informed of any changes.
            </p>
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>6. Liability</h2>
            <p className={styles.text}>
              We are not responsible for any losses or damages that may arise
              from the use of our site. Use of the site is at your own
              discretion and risk.
            </p>
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.subtitle}>7. Contact Us</h2>
            <p className={styles.text}>
              If you have any questions or comments regarding these terms,
              please feel free to contact us. You can find team contacts on
              Contacts page
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
};
