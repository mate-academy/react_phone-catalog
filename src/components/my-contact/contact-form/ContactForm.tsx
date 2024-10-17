import { FC } from 'react';

import styles from './contactForm.module.scss';

export const ContactForm: FC = () => {
  return (
    <div className={styles.contactForm}>
      <h2>Get In Touch</h2>
      <p>
        Please fill out the form below to send us an email and we will get back
        to you as soon as possible.
      </p>
      <form action="submit" className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="  Andrew Jhones"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="  yourEmail@gmail.com"
          required
        />
        <label htmlFor="tel">Phone</label>
        <input
          id="tel"
          type="tel"
          name="tel"
          placeholder="  +380(050)-111-11-11"
          required
        />
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="  Write your message…"
          rows={2}
          required
        ></textarea>
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};
