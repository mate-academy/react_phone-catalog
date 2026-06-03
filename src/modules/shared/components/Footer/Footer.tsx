import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { createPortal } from 'react-dom';

export const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRightsOpen, setIsRightsOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLogo} to="/">
        <img src="img/icons/Logo.svg" alt="Logo" />
      </Link>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://github.com/shymkivvasyl"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <button className={styles.link} onClick={() => setIsContactOpen(true)}>
          Contacts
        </button>
        <button className={styles.link} onClick={() => setIsRightsOpen(true)}>
          Rights
        </button>
      </div>
      <button
        className={styles.button}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        Back to top
        <div className={styles.icon}>
          <img src="img/icons/Chevron_(Arrow_Up).svg" alt="go to top" />
        </div>
      </button>

      {isContactOpen &&
        createPortal(
          <div
            className={styles.overlay}
            onClick={() => setIsContactOpen(false)}
          >
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <h3 className={styles.title}>Contacts</h3>
              <p>
                💼{' '}
                <a href="https://www.linkedin.com/in/vasyl-shymkiv-62127a38a/">
                  LinkedIn
                </a>
              </p>
              <p>
                📧{' '}
                <a href="mailto:shymkiv.vasyl333@gmail.com">
                  shymkiv.vasyl333@gmail.com
                </a>
              </p>
              <p>
                📱 <a href="tel:+380989393144">+38 098 939 3144</a>
              </p>
              <button onClick={() => setIsContactOpen(false)}>Close</button>
            </div>
          </div>,
          document.body,
        )}

      {isRightsOpen &&
        createPortal(
          <div
            className={styles.overlay}
            onClick={() => setIsRightsOpen(false)}
          >
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <h3 className={styles.title}>Rights</h3>
              <p>© 2026 Shymkiv Vasyl.</p>
              <p>All rights reserved.</p>
              <button onClick={() => setIsRightsOpen(false)}>Close</button>
            </div>
          </div>,
          document.body,
        )}
    </footer>
  );
};
