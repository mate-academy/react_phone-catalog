import React from 'react';
import { BrandNewModelsSlider } from '../NewModelsSlider';
import styles from './NewModels.module.scss';

export const NewModels: React.FC = () => {
  return (
    <section className={styles.newModelsSection}>
      <div className={styles.appContainer}>
        <div className={styles.newModelsSectionContent}>
          <div className={styles.wrapper}>
            <h2 className={styles.sectionTitle}>Brand new models</h2>
          </div>
          <BrandNewModelsSlider />
        </div>
      </div>
    </section>
  );
};
