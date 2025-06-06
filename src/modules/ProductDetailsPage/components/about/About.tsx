import React from 'react';
import styles from './About.module.scss';
import { Accessories } from '../../../../types/Accessories';
import { Phones } from '../../../../types/Phones';
import { Tablets } from '../../../../types/Tablets';

type Props = {
  product: Accessories | Phones | Tablets;
};

export const About: React.FC<Props> = ({ product }) => (
  <section className={styles.about}>
    <h3 className={styles.title}>About</h3>

    {product.description.map(article => (
      <article key={article.title} className={styles.article}>
        <h4 className={styles.articleTitle}>{article.title}</h4>

        {article.text.map((text, i) => (
          <p key={i} className={styles.articleText}>
            {text}
          </p>
        ))}
      </article>
    ))}
  </section>
);
