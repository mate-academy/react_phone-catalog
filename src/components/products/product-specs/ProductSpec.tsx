import { FC } from 'react';

import styles from './ProductSpec.module.scss';

type TProps = {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  capacity?: string;
  memory?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

export const ProductSpec: FC<TProps> = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  memory,
  camera,
  zoom,
  cell,
}) => {
  const cellText = cell?.join(', ');

  return (
    <div className={styles.specs}>
      <div className={styles.spec}>
        <p>Screen</p>
        <p>{screen}</p>
      </div>

      {resolution && (
        <div className={styles.spec}>
          <p>Resolution</p>
          <p>{resolution}</p>
        </div>
      )}

      {processor && (
        <div className={styles.spec}>
          <p>Processor</p>
          <p>{processor}</p>
        </div>
      )}

      {capacity && (
        <div className={styles.spec}>
          <p>Capacity</p>
          <p>{capacity}</p>
        </div>
      )}

      <div className={styles.spec}>
        <p>RAM</p>
        <p>{ram}</p>
      </div>

      {memory && (
        <div className={styles.spec}>
          <p>Built in memory</p>
          <p>{memory}</p>
        </div>
      )}

      {camera && (
        <div className={styles.spec}>
          <p>Camera</p>
          <p>{camera}</p>
        </div>
      )}

      {zoom && (
        <div className={styles.spec}>
          <p>Zoom</p>
          <p>{zoom}</p>
        </div>
      )}

      {cell && (
        <div className={styles.spec}>
          <p>Cell</p>
          <p>{cellText}</p>
        </div>
      )}
    </div>
  );
};
