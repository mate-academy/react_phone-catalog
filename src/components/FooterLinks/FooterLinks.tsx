import type React from 'react';
import styles from './FooterLinks.module.scss';
import { LINKEDIN_URL, REPO_URL } from '../../constants/futer-links';

export const FooterLinks: React.FC = () => {
  return (
    <ul className={styles['footer-links']}>
      <li>
        <a
          href={REPO_URL}
          className={styles['footer-link']}
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </li>
      <li>
        <a
          href={LINKEDIN_URL}
          className={styles['footer-link']}
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>
      </li>
      <li>
        <a
          href={`${REPO_URL}/blob/master/LICENSE`}
          className={styles['footer-link']}
          target="_blank"
          rel="noreferrer"
        >
          Rights
        </a>
      </li>
    </ul>
  );
};
