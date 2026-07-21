import { ProductDescription } from '../../../shared/types/Product';
import { FC } from 'react';
import styles from './ProductAbout.module.scss';
type Props = {
  description: ProductDescription[];
};

export const ProductAbout: FC<Props> = ({ description }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.about__title}>About</h3>
      <div className={styles.about__sections}>
        {description.map(section => {
          return (
            <article key={section.title} className={styles.about__section}>
              <h4 className={styles.about__sectionTitle}>{section.title}</h4>
              {section.text.map(paragraph => (
                <p className={styles.about__text} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </article>
          );
        })}
      </div>
    </div>
  );
};
