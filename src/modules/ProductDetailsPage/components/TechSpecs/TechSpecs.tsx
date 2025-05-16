import React from 'react';
import classNames from 'classnames';

import { DetailedProduct } from '../../../../types';
import styles from './TechSpecs.module.scss';

type Props = {
  product: DetailedProduct;
  className?: string;
};

export const TechSpecs: React.FC<Props> = ({
  product: { screen, resolution, processor, ram, capacity, camera, zoom, cell },
  className,
}) => {
  const specs: { label: string; value: string | null }[] = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
    { label: 'Built in memory', value: capacity },
    { label: 'Camera', value: camera || null },
    { label: 'Zoom', value: zoom || null },
    { label: 'Cell', value: cell.join(', ') },
  ];

  return (
    <section className={classNames(styles['tech-specs'], className)}>
      <h3 className={styles['tech-specs__title']}>Tech specs</h3>
      <ul className={styles['tech-specs__list']}>
        {specs.map(
          ({ label, value }) =>
            value && (
              <li key={label} className={styles['tech-specs__item']}>
                <span className={styles['tech-specs__property']}>{label}</span>
                <span className={styles['tech-specs__value']}>{value}</span>
              </li>
            ),
        )}
      </ul>
    </section>
  );
};
