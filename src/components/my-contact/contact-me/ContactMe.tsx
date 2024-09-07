import { FC } from 'react';

import { FiMapPin } from 'react-icons/fi';
import { CgMail } from 'react-icons/cg';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaLinkedin, FaPhoneAlt, FaTelegram } from 'react-icons/fa';

import styles from './contactMe.module.scss';

export const ContactMe: FC = () => (
  <div className={styles.details}>
    <h2>Contact Information</h2>
    <p>
      <CgMail />
      <a href="mailto:galosaandrew@gmail.com">Email: galosaandrew@gmail.com</a>
    </p>
    <p>
      <FaPhoneAlt />
      <a href="tel:+380501111111">Phone: +380 50 111 11 11</a>
    </p>
    <div className={styles.info}>
      <p>
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
      </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d162713.02579514842!2d30.514827778632398!3d50.41526602538512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2sKyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1724671792921!5m2!1sen!2sua"
        width="150"
        height="150"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <h3>Follow me</h3>
    <ul className={styles.social}>
      <li>
        <a
          href="https://www.linkedin.com/in/andriy-halosa-b0900a302/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
      </li>
      <li>
        <a href="https://t.me/Galerss" target="_blank" rel="noreferrer">
          <FaTelegram />
        </a>
      </li>
      <li>
        <a href="https://x.com/1Galers" target="_blank" rel="noreferrer">
          <FaXTwitter />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/profile.php?id=61553691657560"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
      </li>
    </ul>
  </div>
);
