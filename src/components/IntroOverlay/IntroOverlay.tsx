import React, { useEffect, useRef, useState } from 'react';

import styles from './IntroOverlay.module.scss';
import { useIntro } from '../../providers/IntroProvider';
import { useAppSelector } from '../../hooks/helperToolkit';

export const IntroOverlay: React.FC = () => {
  const fullText = 'Welcome to Nice Gadgets store!     ';
  const [displayedText, setDisplayedText] = useState('');
  const currentIndex = useRef(0);
  const { textFullyDisplayed, setTextFullyDisplayed, hideIntroOverlay } =
    useIntro();
  const isLoading = useAppSelector(state => state.ui.isLoading);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (textFullyDisplayed && !isLoading) {
      timeout = setTimeout(() => {
        hideIntroOverlay();
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [textFullyDisplayed, isLoading, hideIntroOverlay]);

  useEffect(() => {
    let isCancelled = false;

    const interval = setInterval(() => {
      if (isCancelled) {
        return;
      }

      currentIndex.current += 1;
      setDisplayedText(fullText.slice(0, currentIndex.current));

      if (currentIndex.current === fullText.length) {
        setTextFullyDisplayed(true);
        clearInterval(interval);
      }
    }, 50);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [fullText, setTextFullyDisplayed]);

  return (
    <div
      className={`${styles.overlay} ${textFullyDisplayed ? styles.hidden : ''}`}
    >
      <h1 className={styles.introText}>{displayedText}</h1>
    </div>
  );
};
