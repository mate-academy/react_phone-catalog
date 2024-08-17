import React from 'react';
import styles from './TechSpecs.module.scss';
/* import { useAppContext } from '../../../../context/AppContext'; */

/* type TechSpecsProps = {
  productDetails: ProductDetails;
}; */

export const TechSpecs: React.FC = () => {
  return (
    <div className={styles.section }>
      <section className={styles.techSpecsSection}>
        <h3 className={styles.sectionTitle}>Tech specs </h3>
        <div className={styles.divider}></div>

        <ul className={styles.specsList}>
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Screen </strong>
            <span className={styles.specsValue}>XXX</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Resolution </strong>
            <span className={styles.specsValue}>XXX</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Processor</strong>
            <span className={styles.specsValue}>XXXX</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Ram</strong>
            <span className={styles.specsValue}>XXX</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Built in memory</strong>
            <span className={styles.specsValue}>XXX</span>
          </li>

            <li className={styles.specs}>
              <strong className={styles.specsKey}>Camera</strong>
              <span className={styles.specsValue}>XXX</span>
            </li>


            <li className={styles.specs}>
              <strong className={styles.specsKey}>Zoom</strong>
              <span className={styles.specsValue}>XXXX</span>
            </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Cell</strong>
            <span className={styles.specsValue}>
              xxx
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};
