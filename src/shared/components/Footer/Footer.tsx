import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoDark from '/img/LogoDark.svg';
import LogoLight from '/img/LogoLight.svg';
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon';
import { useTheme } from '@/app/providers/ThemeContext';
import classNames from 'classnames';
import { CustomModal } from '../CustomModal/CustomModal';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(prev => !prev);
  const { theme } = useTheme();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const checkScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;

      setShowBackToTop(isScrollable);
    };

    checkScroll();
    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <footer className={styles.footer}>
        <Link to="/" className={styles.footer__logo} onClick={handleScrollTop}>
          <img
            src={theme === 'dark' ? LogoDark : LogoLight}
            alt="MyShop Logo"
          />
        </Link>

        <div className={styles.footer__links}>
          <a
            className={styles.footer__link}
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <a
            className={styles.footer__link}
            href="https://www.linkedin.com/in/anton-donchenko-83aa85165"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACTS
          </a>
          <Link className={styles.footer__link} to="#" onClick={handleClose}>
            RIGHTS
          </Link>
        </div>

        {showBackToTop && (
          <button
            className={styles.footer__backtoTopButton}
            onClick={handleScrollTop}
            aria-label="Scroll back to top"
          >
            <span className={styles.footer__backtoTopText}>Back to top</span>
            <div
              className={classNames(styles.footer__backtoTopIcon, {
                [styles['footer__backtoTopIcon--dark']]: theme === 'dark',
              })}
            >
              <ArrowIcon direction="up" />
            </div>
          </button>
        )}
      </footer>
      {isModalOpen && (
        <CustomModal
          onClose={handleClose}
          modalTitle="Rights"
          modalBody={<p>© Nice Gadgets. All rights reserved.</p>}
        />
      )}
    </>
  );
};

export default Footer;
