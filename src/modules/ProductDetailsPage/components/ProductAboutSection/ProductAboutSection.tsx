import React from 'react';
import styles from './ProductAboutSection.module.scss';

type DescriptionProps = {
  description: [
    {
      title: string;
      text: string[];
    },
  ];
};

export const ProductAboutSection = ({ description }: DescriptionProps) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.section__title}>About</h3>
      <div className={styles.verticalLine}></div>
      {description.map(desc => (
        <article key={desc.title} className={styles.article}>
          <h4 className={styles.article__title}>{desc.title}</h4>
          {desc.text.map(artcileText => (
            <p key={artcileText} className={styles.article__text}>
              {artcileText}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
};
