import styles from './AboutProduct.module.scss';
import React from 'react';

interface DescriptionItem {
  title: string;
  text: string[];
}

interface Props {
  description: DescriptionItem[];
}

export const AboutProduct: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.aboutProductContainer}>
      <h3 className={styles.aboutTitle}>About</h3>
      {description.map(({ title, text }) => {
        return (
          <div className={styles.descriptionContainer} key={title}>
            <h4 className={styles.descriptionTitle}>{title}</h4>
            {text.map(paragraph => (
              <p className={styles.descriptionText} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
