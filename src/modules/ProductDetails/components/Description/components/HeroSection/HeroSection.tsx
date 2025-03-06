/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';

import { MainContext } from '../../../../../../context/MainContext';
import { Divider } from '../../../../../HomePage/components/Models/components/Main/components/Model/components/Divider';
import { Capacity } from './components/Capacity';
import { Colors } from './components/Colors';
import { Images } from './components/Images';
import { MainImage } from './components/Images/components/MainImage';
import { Summary } from './components/Summary';
import styles from './HeroSection.module.scss';

export const HeroSection: React.FC = () => {
  const { isTablet } = useContext(MainContext);

  return (
    <section className={styles['hero-section']}>
      <Images />
      {isTablet && <MainImage />}
      <div className={styles.wrapper}>
        <Colors />
        <Divider />
        <Capacity />
        <Divider />
        <Summary />
      </div>
    </section>
  );
};
