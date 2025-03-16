import { useContext } from 'react';
import styles from './TechSpecs.module.scss';
import { AppContext } from '../../context/AppContext';

export const TechSpecs = () => {
  const { activeProduct } = useContext(AppContext) || {};

  return (
    <div className={`${styles.techSpecs} blocksIdentation`}>
      <h3 className={styles.techSpecs__title}>Tech specs</h3>

      <div className={styles.techSpecs__splitter} />

      <article className={styles.techSpecs__specs}>
        <div className={styles.techSpecs__specContainer}>
          <p>Screen</p>

          <p>{activeProduct?.screen}</p>
        </div>

        <div className={styles.techSpecs__specContainer}>
          <p>Resolution</p>

          <p>{activeProduct?.resolution}</p>
        </div>

        <div className={styles.techSpecs__specContainer}>
          <p>Processor</p>

          <p>{activeProduct?.processor}</p>
        </div>

        <div className={styles.techSpecs__specContainer}>
          <p>Built in memory</p>

          <p>{activeProduct?.capacity}</p>
        </div>

        <div className={styles.techSpecs__specContainer}>
          <p>RAM</p>

          <p>{activeProduct?.ram}</p>
        </div>

        <div className={styles.techSpecs__specContainer}>
          <p>Camera</p>

          <p>{activeProduct?.camera}</p>
        </div>

        <div className={styles.techSpecs__specContainer}>
          <p>Zoom</p>

          <p>{activeProduct?.zoom}</p>
        </div>
        <div className={styles.techSpecs__specContainer}>
          <p>Cell</p>

          <p>
            {activeProduct?.cell?.map((singleCell, index, array) => (
              <span key={index}>
                {singleCell}
                {index < array.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      </article>
    </div>
  );
};
