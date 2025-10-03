import React from 'react';
import {
  TechSpecsExtended,
  techSpecUIExtended,
} from '@pages/productPage/model';
import shared from '../../../styles/articleSection/shared.module.scss';
import styles from '../../../styles/articleSection/techSpecs.module.scss';

type Props = {
  specs: TechSpecsExtended;
};

export const TechSpecs = ({ specs }: Props) => {
  return (
    <section
      aria-labelledby="tech-specs-heading"
      className={shared['article-section-container']}
    >
      <h2 className={shared.heading} id="tech-specs-heading">
        tech specs
      </h2>
      <dl className={styles['tech-specs']}>
        {Object.entries(specs).map(([key, value]) => {
          const typedKey = key as keyof typeof techSpecUIExtended;
          const val = Array.isArray(value) ? value.join(', ') : value;

          return (
            <React.Fragment key={key}>
              <dt className={shared['main-text']}>
                {techSpecUIExtended[typedKey]}
              </dt>
              <dd className={styles['tech-specs__value']}>{val}</dd>
            </React.Fragment>
          );
        })}
      </dl>
    </section>
  );
};
