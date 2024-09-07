import { FC } from 'react';

import styles from './contact.module.scss';

import { ContactMe } from './contact-me/ContactMe';
import { ContactForm } from './contact-form/ContactForm';

export const Contact: FC = () => (
  <section className={styles.contact}>
    <ContactMe />
    <ContactForm />
  </section>
);
