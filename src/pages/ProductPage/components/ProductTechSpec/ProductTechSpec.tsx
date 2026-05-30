import React from 'react';

import styles from './ProductTechSpec.module.scss';

type Props = {
  title: string;
  value: string | string[];
};

export const ProductTechSpec: React.FC<Props> = ({ title, value }) => {
  return (
    <div className={styles['product__tech-spec-wrapper']}>
      <p className="main-text main-text--secondary main-text--capitalize">
        {title}
      </p>
      {Array.isArray(value) ? (
        <p className={`main-text ${styles['tech-spec__value']}`}>
          {value.map((item, index) => {
            if (index === value.length - 1) {
              return `${item}`;
            } else {
              return `${item}, `;
            }
          })}
        </p>
      ) : (
        <p className={`main-text ${styles['tech-spec__value']}`}>{value}</p>
      )}
    </div>
  );
};
