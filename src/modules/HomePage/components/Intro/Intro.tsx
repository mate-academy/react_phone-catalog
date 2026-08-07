import React from 'react';
import { Container } from '@shared/components/Container';
import { Typography } from '@shared/ui/Typography';
import { PicturesSlider } from '../PicturesSlider';
import { sliderImages } from '../../../../assets/slider';
import styles from './Intro.module.scss';
import { useTranslation } from 'react-i18next';

export const Intro: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.intro}>
      <Container>
        <Typography variant="h1" className={styles.introTitle}>
          {t('homePage.title')}
        </Typography>

        <div className={styles.sliderWrapper}>
          <PicturesSlider images={sliderImages} />
        </div>
      </Container>
    </section>
  );
};
