import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import styles from './HelloModalBlock.module.scss';
import close from '/icons/close.svg';

export const HelloModalBlock: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsModalOpen(false);
      }
    });

    return () => listen();
  }, []);

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('hasVisitedSite');

    if (isFirstVisit) {
      setIsModalOpen(true);
      sessionStorage.setItem('hasVisitedSite', 'true');
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <section
      className={styles.helloModalBlockOverlay}
      onClick={closeModal}
    >
      <div
        className={styles.helloModalBlock}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.closeButton}
          onClick={closeModal}
        >
          <img
            src={close}
            alt="close"
            className="app-icon"
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Welcome to Our Store!</h2>
          <h3 className={styles.subtitle}>Sign Up and Get 5% Off!</h3>
          <p className={styles.description}>
            {`Create an account now and receive 5% off your first order. It's quick,
            free, and totally worth it! Don’t miss out — join us today!`}
          </p>
          <Link
            to="/login"
            onClick={closeModal}
            className={styles.signUp}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};
