import styles from './RightsPage.module.scss';

export default function RightsPage() {
  return (
    <div className={styles.rightsPage}>
      <h1 className={styles.title}>Rights</h1>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Terms of Service</h2>
          <p>By using Nice Gadgets, you agree to these terms and conditions.</p>

          <h3>Use of Service</h3>
          <p>
            You may use our service for lawful purposes only. You agree not to
            use the service in any way that violates applicable laws or
            regulations.
          </p>

          <h3>Product Information</h3>
          <p>
            We strive to provide accurate product information, but we do not
            warrant that product descriptions or other content is accurate,
            complete, reliable, current, or error-free.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Privacy Policy</h2>
          <p>
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>

          <h3>Information We Collect</h3>
          <ul>
            <li>Personal information you provide when creating an account</li>
            <li>Order and payment information</li>
            <li>Usage data and preferences</li>
            <li>Device and browser information</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send promotional communications (with your consent)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Return Policy</h2>
          <p>We want you to be completely satisfied with your purchase.</p>

          <h3>Return Window</h3>
          <p>
            You may return most items within 30 days of delivery for a full
            refund.
          </p>

          <h3>Return Conditions</h3>
          <ul>
            <li>Items must be in original condition</li>
            <li>Original packaging and accessories included</li>
            <li>No signs of damage or excessive wear</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Warranty</h2>
          <p>
            All products come with manufacturer warranty. Warranty terms vary by
            product and manufacturer.
          </p>

          <h3>What&apos;s Covered</h3>
          <ul>
            <li>Manufacturing defects</li>
            <li>Hardware malfunctions under normal use</li>
            <li>Battery performance issues (where applicable)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Contact Information</h2>
          <p>If you have questions about these terms, please contact us:</p>
          <p>Email: legal@nicegadgets.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </section>
      </div>
    </div>
  );
}
