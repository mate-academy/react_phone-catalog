import React, { useContext } from 'react';

import { ProductsContext } from '../../../../../../context/ProductsContext';
// eslint-disable-next-line max-len
import { CurrentProduct } from '../../../../../../context/ProductsContext/types/CurrentProduct';
import { DividerMT16 } from '../DividerMT16';
import styles from './TechSpecs.module.scss';

export const TechSpecs: React.FC = () => {
  // #region context and object keys

  const { currentProduct } = useContext(ProductsContext);
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity: builtInMemory,
    camera,
    zoom,
    cell,
  } = currentProduct as CurrentProduct;

  // #endregion

  const specs = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    RAM: ram,
    'Built in memory': builtInMemory,
    Camera: camera,
    Zoom: zoom,
    Cell: cell.join(', '),
  };

  const specsEntries = Object.entries(specs).filter(entry =>
    entry[1] ? entry : undefined,
  );

  return (
    <section className={styles['tech-specs']}>
      <div className={styles['title-wrapper']}>
        <h2 className={styles.title}>Tech specs</h2>
        <DividerMT16 />
      </div>
      <div className={styles.specs}>
        {specsEntries.map(entry => {
          const key = entry[0];
          const value = entry[1];

          return (
            <div className={styles.spec} key={`spec-${key}`}>
              <div className={styles['spec-title']}>{key}</div>
              <div className={styles['spec-value']}>{value}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
