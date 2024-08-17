import React from 'react';
import styles from './TechSpecs.module.scss';
import { useAppContext } from '../../../../context/AppContext';
/* import { ProductAccessory, ProductPhone, ProductTablet } from '../../../../types/Product'; */

/* type TechSpecsProps = {
  clickedProduct: ProductAccessory | ProductPhone | ProductTablet | undefined;
}; */

export const TechSpecs: React.FC = () => {

  const {clickedProduct} = useAppContext();
  if (clickedProduct !== undefined) {
  return (
    <div className={styles.section }>
      <section className={styles.techSpecsSection}>
        <h3 className={styles.sectionTitle}>Tech specs </h3>
        <div className={styles.divider}></div>

        <ul className={styles.specsList}>
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Screen </strong>
            <span className={styles.specsValue}>{`${clickedProduct.screen}`}</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Resolution </strong>
            <span className={styles.specsValue}>{`${clickedProduct.resolution}`}</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Processor</strong>
            <span className={styles.specsValue}>{`${clickedProduct.processor}`}</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Ram</strong>
            <span className={styles.specsValue}>{`${clickedProduct.ram}`}</span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Built in memory</strong>
            <span className={styles.specsValue}>{`${clickedProduct.capacity}`}</span>
          </li>

          {'camera' in clickedProduct && (
            <li className={styles.specs}>
              <strong className={styles.specsKey}>Camera</strong>
              <span className={styles.specsValue}>{`${clickedProduct.camera}`}</span>
            </li>
                )
              }

            {'zoom' in clickedProduct && (
            <li className={styles.specs}>
            <strong className={styles.specsKey}>Zoom</strong>
            <span className={styles.specsValue}>{`${clickedProduct.zoom}`}</span>
          </li>
            )
            }

            {'ceil' in clickedProduct && (
      <li className={styles.specs}>
      <strong className={styles.specsKey}>Cell</strong>
      <span className={styles.specsValue}>
      {`${clickedProduct.ceil}`}
      </span>
    </li>
            )

            }

        </ul>
      </section>
    </div>
  );
} else return <div/>
}
