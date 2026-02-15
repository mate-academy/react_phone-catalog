/* eslint-disable import/extensions */
import { ProductDetailed } from '@/types/ProductDetailed';
import React from 'react';
import '@/styles/main.scss';
import styles from './TechSpecs.module.scss';
import classNames from 'classnames';

interface Props {
  details: ProductDetailed;
}

export const TechSpecs: React.FC<Props> = ({ details }) => {
  return (
    <div className={styles.tech_specs}>
      <div className={styles.tech_specs__spec}>
        <p
          className={classNames(styles['tech_specs__spec--type'], 'text__body')}
        >
          Screen
        </p>
        <p
          className={classNames(
            styles['tech_specs__spec--value'],
            'text__body',
          )}
        >
          {details.screen}
        </p>
      </div>
      <div className={styles.tech_specs__spec}>
        <p
          className={classNames(styles['tech_specs__spec--type'], 'text__body')}
        >
          Resolution
        </p>
        <p
          className={classNames(
            styles['tech_specs__spec--value'],
            'text__body',
          )}
        >
          {details.resolution}
        </p>
      </div>
      <div className={styles.tech_specs__spec}>
        <p
          className={classNames(styles['tech_specs__spec--type'], 'text__body')}
        >
          Processor
        </p>
        <p
          className={classNames(
            styles['tech_specs__spec--value'],
            'text__body',
          )}
        >
          {details.processor}
        </p>
      </div>
      <div className={styles.tech_specs__spec}>
        <p
          className={classNames(styles['tech_specs__spec--type'], 'text__body')}
        >
          RAM
        </p>
        <p
          className={classNames(
            styles['tech_specs__spec--value'],
            'text__body',
          )}
        >
          {details.ram}
        </p>
      </div>
      <div className={styles.tech_specs__spec}>
        <p
          className={classNames(styles['tech_specs__spec--type'], 'text__body')}
        >
          Built in memory
        </p>
        <p
          className={classNames(
            styles['tech_specs__spec--value'],
            'text__body',
          )}
        >
          {details.capacity}
        </p>
      </div>
      {details.camera && (
        <div className={styles.tech_specs__spec}>
          <p
            className={classNames(
              styles['tech_specs__spec--type'],
              'text__body',
            )}
          >
            Camera
          </p>
          <p
            className={classNames(
              styles['tech_specs__spec--value'],
              'text__body',
            )}
          >
            {details.camera}
          </p>
        </div>
      )}
      {details.zoom && (
        <div className={styles.tech_specs__spec}>
          <p
            className={classNames(
              styles['tech_specs__spec--type'],
              'text__body',
            )}
          >
            Zoom
          </p>
          <p
            className={classNames(
              styles['tech_specs__spec--value'],
              'text__body',
            )}
          >
            {details.zoom}
          </p>
        </div>
      )}
      <div className={styles.tech_specs__spec}>
        <p
          className={classNames(styles['tech_specs__spec--type'], 'text__body')}
        >
          Cell
        </p>
        <p
          className={classNames(
            styles['tech_specs__spec--value'],
            'text__body',
          )}
        >
          {details.cell.map((c: string, i: number) => {
            return i === details.cell.length - 1 ? (
              <span key={i}>{c}</span>
            ) : (
              <span key={i}>{c}, </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
