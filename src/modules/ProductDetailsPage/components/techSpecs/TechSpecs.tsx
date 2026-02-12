import React from 'react';

import styles from './TechSpecs.module.scss';
import { Accessories } from '../../../../types/Accessories';
import { Phones } from '../../../../types/Phones';
import { Tablets } from '../../../../types/Tablets';
import { titleText } from '../../../../utils/titleText';

type Props = {
  product: Accessories | Phones | Tablets;
};

const visibleData = [
  'screen',
  'resolution',
  'processor',
  'capacity',
  'ram',
  'camera',
  'zoom',
  'cell',
];

export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.techSpecs}>
      <h3 className={styles.title}>Tech specs</h3>

      <ul className={styles.list}>
        {Object.entries(product).map(([key, value]) => {
          const category = titleText(key);
          const data = Array.isArray(value) ? value.join(', ') : `${value}`;

          return (
            visibleData.includes(key) && (
              <li key={key} className={styles.listItem}>
                <span className={styles.category}>{category}</span>

                <span className={styles.data}>{data}</span>
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
};
