import styles from './ContactsPage.module.scss';
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
} from 'react-icons/io5';

export default function ContactsPage() {
  return (
    <div className={styles.contactsPage}>
      <h1 className={styles.title}>Contacts</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Get in Touch</h2>
          <p>
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </section>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <h3>
              <IoMailOutline className={styles.icon} /> Email
            </h3>
            <p>support@nicegadgets.com</p>
            <p>sales@nicegadgets.com</p>
          </div>

          <div className={styles.contactCard}>
            <h3>
              <IoCallOutline className={styles.icon} /> Phone
            </h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon-Fri: 9AM-6PM EST</p>
          </div>

          <div className={styles.contactCard}>
            <h3>
              <IoLocationOutline className={styles.icon} /> Address
            </h3>
            <p>123 Tech Street</p>
            <p>San Francisco, CA 94105</p>
            <p>United States</p>
          </div>

          <div className={styles.contactCard}>
            <h3>
              <IoLogoGithub className={styles.icon} /> Social Media
            </h3>
            <p>Follow us for updates</p>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <IoLogoGithub /> Github
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <IoLogoLinkedin /> Linkedin
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <IoLogoInstagram /> Instagram
              </a>
            </div>
          </div>

          <div className={styles.contactCard}>
            <h3>
              <IoPersonOutline className={styles.icon} /> Oportunities
            </h3>
            <p>Talk us for more information</p>
          </div>
        </div>

        <section className={styles.section}>
          <h2>Customer Support</h2>
          <p>
            Need help with your order? Our customer support team is here to here
            to assist you with:
          </p>
          <ul>
            <li>Order tracking and status</li>
            <li>Product information and specifications</li>
            <li>Returns and exchanges</li>
            <li>Technical support</li>
            <li>Warranty claims</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
