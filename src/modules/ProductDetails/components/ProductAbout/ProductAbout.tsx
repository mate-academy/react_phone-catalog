import React from 'react';
import styles from './ProductAbout.module.scss';

interface Props {
  description: { title: string; text: string[] }[];
}

export const ProductAbout: React.FC<Props> = ({ description }) => {
  return (
    <section className={styles.productAbout}>
      <h2 className={styles.title}>About</h2>

      {description.map(desc => (
        <article key={desc.title} className={styles.productDescription}>
          <h3 className={styles.subtitle}>{desc.title}</h3>

          {desc.text.map((paragraph, idx) => (
            <p key={idx} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
};
