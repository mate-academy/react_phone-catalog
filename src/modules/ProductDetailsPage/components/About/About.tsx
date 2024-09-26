import { FC } from 'react';
import { ProductDescription } from '../../../../types/ProductDetails';
import styles from './About.module.scss';

type Props = {
  description: ProductDescription;
};

export const About: FC<Props> = ({ description }) => {
  return (
    <div>
      <h3 className={styles.sectionTitle}>About</h3>
      <section className={styles.descriptionSection}>
        <div className={styles.divider}></div>

        {description.map(
          (desc: { title: string; text: string[] }, index: number) => (
            <article key={index} className={styles.descriptionItemSection}>
              <h4 className={styles.descriptionTitle}>{desc.title}</h4>
              {desc.text.map((paragraph, idx) => (
                <p key={idx} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </article>
          ),
        )}
      </section>
    </div>
  );
};
