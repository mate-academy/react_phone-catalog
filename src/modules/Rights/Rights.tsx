import classNames from 'classnames';
import styles from './Rights.module.scss';

export const Rights = () => {
  return (
    <div className="container">
      <div className={classNames(styles.rightsWrapper, 'grid')}>
        <h1 className={styles.title}>Rights & Terms</h1>

        <section className={styles.section}>
          <h3>Introduction</h3>
          <div className={classNames(styles.text, 'body-text')}>
            Welcome to <strong>Gadget Store</strong>. These Terms and Conditions outline the rules
            and regulations for the use of our Website. By accessing this website, we assume you
            accept these terms and conditions in full. Do not continue to use Gadget Store website
            if you do not accept all of the terms and conditions stated on this page.
          </div>
        </section>

        <section className={styles.section}>
          <h3>Privacy & Cookies</h3>
          <div className={classNames(styles.text, 'body-text')}>
            Unless otherwise stated, <strong>Gadget Store</strong> and/or its licensors own the
            intellectual property rights for all material on the Website. All intellectual property
            rights are reserved. You may view and/or print pages from our website for your own
            personal use subject to restrictions set in these terms and conditions.
          </div>
        </section>

        <section className={styles.section}>
          <h3>Copyright</h3>
          <div className={classNames(styles.text, 'body-text')}>
            © 2026 <strong>Gadget Store</strong>. All rights reserved. All content on this website,
            including text, unique product descriptions, graphics, logos, and software code, is the
            exclusive property of Gadget Store and is protected by international copyright and
            trademark laws. Any unauthorized reproduction, modification, distribution, or
            republication of these materials without prior written permission is strictly prohibited
            and may result in legal action.
          </div>
        </section>
      </div>
    </div>
  );
};
