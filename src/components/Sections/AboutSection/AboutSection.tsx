import type { FC } from 'react';

import type { ProductDescription } from '../../../types/detailedProduct';

import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  description: ProductDescription[];
}

export const AboutSection: FC<AboutSectionProps> = ({ description }) => {
  if (!description || description.length === 0) {
    return null;
  }

  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>About</h2>
        <div className={styles.line}></div>
      </div>

      {description.map((block, blockIndex) => (
        <div
          key={blockIndex}
          className={styles.textContainer}
        >
          <h3 className={styles.subtitle}>{block.title}</h3>
          {block.text.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className={styles.text}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};
