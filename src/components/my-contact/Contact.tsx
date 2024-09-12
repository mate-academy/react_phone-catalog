import { FC } from 'react';

import styles from './contact.module.scss';

import { ContactMe } from './contact-me/ContactMe';
import { ContactForm } from './contact-form/ContactForm';
import { BackArrow } from '@ui/button/arrow/BackArrow';

export const Contact: FC = () => (
  <section className={styles.contact}>
    <BackArrow />
    <div className={styles.wrapper}>
      <ContactMe />
      <ContactForm />
    </div>
  </section>
);
