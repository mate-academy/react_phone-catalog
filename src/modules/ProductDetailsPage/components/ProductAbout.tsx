import React from 'react';
import styles from './ProductAbout.module.scss';

interface DescriptionBlock {
  title: string;
  text: string[];
}

interface Props {
  description: DescriptionBlock[];
}

export const ProductAbout: React.FC<Props> = ({ description }) => {
  const hasDescription = description && description.length > 0;

  return (
    <section className={styles.about}>
      <h2 className={styles.title}>About</h2>

      {!hasDescription ? (
        <p className={styles.empty}>No description available.</p>
      ) : (
        description.map(({ title, text }) => (
          <div key={title} className={styles.block}>
            <h3 className={styles.subtitle}>{title}</h3>
            {text.map((paragraph, i) => (
              <p key={i} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </div>
        ))
      )}
    </section>
  );
};
