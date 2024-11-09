import React from 'react';
import { Container } from '../Container';
import styles from './HotPrices.module.scss';
import { HotPricesSlider } from '../HotPricesSlider';

export const HotPrices: React.FC = () => {
  return (
    <section className={styles.hotModelsSection}>
      <Container>
        <div className={styles.hotModelsSectionContent}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>Hot prices</h2>
          </div>
          <HotPricesSlider />
        </div>
      </Container>
    </section>
  );
};
