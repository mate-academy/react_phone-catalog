import React, { useEffect, useState } from 'react';
import { NavigationButton } from '../NavigationButton';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import styles from './Header.module.scss';
import { NavigationMobile } from '../NavigationMobile';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.header}>
      {isMobile ? (
        <>
          <Logo size={'small'} />
          <NavigationButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <NavigationMobile isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </>
      ) : (
        <>
          <Logo size={'medium'} />
          <Navigation />
        </>
      )}
    </div>
  );
};
