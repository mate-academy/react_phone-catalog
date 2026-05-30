/* eslint-disable max-len */
import React from 'react';
import styles from './TechSpecs.module.scss';
import { Gadget } from '../../../../types/Gadget';

type Props = {
  gadget: Gadget;
};

export const TechSpecs: React.FC<Props> = ({ gadget }) => {
  return (
    <div className={styles.specs}>
      <div className={styles.top}>
        <h1 className={styles.title}>Tech specs</h1>
        <hr />
      </div>

      <div className={styles.info}>
        <span className={styles.outer}>
          <span className={styles.inner}>Screen</span>
          {gadget.screen}
        </span>

        <span className={styles.outer}>
          <span className={styles.inner}>Resolution</span>
          {gadget.resolution}
        </span>

        <span className={styles.outer}>
          <span className={styles.inner}>Processor</span>
          {gadget.processor}
        </span>

        <span className={styles.outer}>
          <span className={styles.inner}>RAM</span>
          {gadget.ram.replaceAll('GB', ' GB')}
        </span>

        <span className={styles.outer}>
          <span className={styles.inner}>Built in memory</span>
          {gadget.capacity.replaceAll('GB', ' GB')}
        </span>

        {gadget.camera && (
          <span className={styles.outer}>
            <span className={styles.inner}>Camera</span>
            {gadget.camera}
          </span>
        )}

        {gadget.zoom && (
          <span className={styles.outer}>
            <span className={styles.inner}>Zoom</span>
            {gadget.zoom}
          </span>
        )}

        <span className={styles.outer}>
          <span className={styles.inner}>Cell</span>
          <div>
            {gadget.cell.map(cell => (
              <span key={cell}>
                {gadget.cell.indexOf(cell) !== gadget.cell.length - 1
                  ? cell.replace(cell, `${cell}, `)
                  : cell}
              </span>
            ))}
          </div>
        </span>
      </div>
    </div>
  );
};
