import { FC } from 'react';

import styles from './contactForm.module.scss';

export const ContactForm: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Get In Touch</h2>
      <p>
        Please fill out the form below to send us an email and we will get back
        to you as soon as possible.
      </p>
      <form action="submit" className={styles.form}>
        <input id="name" type="text" name="name" placeholder="Name" required />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input id="tel" type="tel" name="tel" placeholder="Tel" required />
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          required
        ></textarea>
        <button type="submit"></button>
      </form>
    </div>
  );
};
