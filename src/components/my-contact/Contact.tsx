import { FC } from 'react';

import { BackArrow } from '@ui/index';

import styles from './Contact.module.scss';
import { ContactForm, ContactMe } from './index';

export const Contact: FC = () => (
  <section className={styles.contact}>
    <BackArrow />
    <div className={styles.wrapper}>
      <ContactMe />
      <ContactForm />
    </div>
  </section>
);
