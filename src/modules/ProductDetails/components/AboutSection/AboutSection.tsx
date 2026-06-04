import React from 'react';

import styles from './AboutSection.module.scss';

import { ProductDetailsType } from '../../../../types/product-details.types';
import classNames from 'classnames';

interface AboutSectionProps {
  details: ProductDetailsType;
  className: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  details,
  className,
}) => {
  return (
    <div className={classNames(styles.aboutSection, className)}>
      <h3 className={styles.sectionTitle}>About</h3>

      <div className={styles.separator} />

      {details.description.map(detail => (
        <div className={styles.box} key={detail.title}>
          <h4 className={styles.title}>{detail.title}</h4>

          {detail.text.map((line, i) => (
            <p className={styles.text} key={i}>
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
