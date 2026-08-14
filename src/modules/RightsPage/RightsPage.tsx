import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <span className={styles.leftArrow} aria-label="Left arrow" />
        <span className={styles.backText}>Back</span>
      </button>

      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <p className={styles.subtitle}>
        By using this website, you agree to the following terms and policies.
        Please read them carefully before using the site.
      </p>

      <div className={styles.content}>
        <section className={styles.section}>
          <h3>General Terms and Conditions</h3>
          <p>
            These Terms of Service govern your use of our platform. By accessing
            or shopping at Nice Gadgets, you accept these conditions in full. We
            reserve the right to update or modify these policies at any time
            without prior notice, so please review this page periodically.
          </p>
        </section>

        <section className={styles.section}>
          <h3>Intellectual Property Rights</h3>
          <p>
            All content published on this website, including digital downloads,
            images, texts, graphics, and logos, is the property of Nice Gadgets
            or its content creators. Unauthorized use, reproduction, or
            distribution of this material is strictly prohibited. But if you are
            a student and you need to check the design or to download the images
            for your own project — you can do it ;&#41;
          </p>
        </section>

        <section className={styles.section}>
          <h3>Privacy Policy & Data Protection</h3>
          <p>
            We take your privacy seriously. The personal information you provide
            during checkout (such as your name, address, and email) is used
            solely for processing your orders. We do not sell or share your
            personal data with third-party advertising companies.
          </p>
        </section>

        <section className={styles.section}>
          <h3>Product Information and Pricing</h3>
          <p>
            While we strive for accuracy, Nice Gadgets does not warrant that
            product descriptions, pricing, or other content on this site is
            error-free. In the event of a pricing error, we reserve the right to
            cancel any orders placed for that item.
          </p>
        </section>

        <section className={styles.section}>
          <h3>Limitation of Liability</h3>
          <p>
            Nice Gadgets shall not be held liable for any direct, indirect,
            incidental, or consequential damages arising out of the use or
            inability to use our products or website. Use of the site is
            entirely at your own risk.
          </p>
        </section>
      </div>
    </div>
  );
};
