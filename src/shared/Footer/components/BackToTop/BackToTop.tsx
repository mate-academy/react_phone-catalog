import { useState, useEffect } from 'react';
import { icons } from '../../../global/Icons';
import styles from './BackToTop.module.scss';
import { RoundedArrow } from '../../../../components/RoundedArrowBtn';
import { scrollToTop } from '../../../../helpers/scrollToTop';

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <button
      className={styles.toTopBtn}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <p>Back to top</p>
      <RoundedArrow icon={icons.arrowTop} />
    </button>
  );
};
