import { FC } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { CgMail } from 'react-icons/cg';
import { FaPhoneAlt } from 'react-icons/fa';

import styles from './ContactInfo.module.scss';

const mailto = 'galosaandrew@gmail.com';

export const ContactInfo: FC = () => {
  return (
    <>
      <div className={styles.info}>
        <CgMail />
        <a href={`mailto:${mailto}`}>{mailto}</a>
      </div>
      <div className={styles.info}>
        <FaPhoneAlt />
        <a href="tel:+380501111111">Phone: +380 50 111 11 11</a>
      </div>
      <div className={styles.info}>
        <address>
          <FiMapPin />
          <a
            href="https://maps.app.goo.gl/EYTkJAt3WgGURQuM6"
            target="_blank"
            rel="noreferrer"
          >
            Address: Kyiv, Ukraine
          </a>
        </address>
      </div>
    </>
  );
};
