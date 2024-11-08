import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CgMail } from 'react-icons/cg';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

import styles from './ContactInfo.module.scss';

const CONTACT_EMAIL = 'galosaandrew@gmail.com';
const CONTACT_PHONE = '+380501111111';
const ADDRESS_URL = 'https://maps.app.goo.gl/EYTkJAt3WgGURQuM6';

export const ContactInfo: FC = () => {
  const { t } = useTranslation();
  const localEmail = t('form.email');
  const localPhone = t('form.phone');
  const localAddress = t('contact.address');

  return (
    <>
      <div className={styles.info}>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-label={`${localEmail}: ${CONTACT_EMAIL}`}
        >
          <CgMail aria-hidden="true" />
          <span>{CONTACT_EMAIL}</span>
        </a>
      </div>
      <div className={styles.info}>
        <a
          href="tel:+380501111111"
          aria-label={`${localPhone}: ${CONTACT_PHONE}`}
        >
          <FaPhoneAlt aria-hidden="true" />
          <span>{`${localPhone}: ${CONTACT_PHONE}`}</span>
        </a>
      </div>
      <div className={styles.info}>
        <address>
          <a
            href={ADDRESS_URL}
            aria-label={localAddress}
            target="_blank"
            rel="noreferrer"
          >
            <FiMapPin aria-hidden="true" />
            {localAddress}
          </a>
        </address>
      </div>
    </>
  );
};
