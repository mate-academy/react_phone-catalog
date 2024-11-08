import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import styles from './ContactMe.module.scss';
import { ContactInfo } from './contact-info/ContactInfo';
import { Greeting } from './greeting/Greeting';
import { SocialLink } from './social-link/SocialLink';
import { socialsLinks } from './social-link/socials.data';

export const ContactMe: FC = () => {
  const { t } = useTranslation();
  const localTitle = t('contact.title');
  const localFollow = t('contact.follow');

  return (
    <div className={styles.details}>
      <Title level={2}>{localTitle}</Title>

      <Greeting />

      <div className={styles.contacts}>
        <ContactInfo />
      </div>

      <div className={styles.follow}>
        <Title level={3}>{localFollow}</Title>

        <ul className={styles.socials}>
          {socialsLinks.map(item => (
            <SocialLink key={item.className} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};
