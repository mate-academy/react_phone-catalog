import { FC } from 'react';

import { SocialLink } from './social-link/SocialLink';
import { Greeting } from './greeting/Greeting';
import { ContactInfo } from './contact-info/ContactInfo';

import { socialsLinks } from './social-link/socials.data';

import styles from './contactMe.module.scss';

export const ContactMe: FC = () => (
  <div className={styles.details}>
    <h2>Contact Information</h2>

    <Greeting />

    <div className={styles.contacts}>
      <ContactInfo />
    </div>

    <div className={styles.follow}>
      <h3>Follow me</h3>
      <ul className={styles.socials}>
        {socialsLinks.map(item => (
          <SocialLink key={item.className} item={item} />
        ))}
      </ul>
    </div>
  </div>
);
