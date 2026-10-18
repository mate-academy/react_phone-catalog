import { ProductDescription } from '../../../../types';
import styles from './About.module.scss';

export const About = ({
  description,
}: {
  description: ProductDescription[];
}) => (
  <section className={styles.about}>
    <h2 className={styles.about__title}>About</h2>

    {description.map(({ title, text }) => (
      <article key={title} className={styles.about__article}>
        <h3 className={styles.about__subtitle}>{title}</h3>

        {text.map(paragraph => (
          <p key={paragraph} className={styles.about__text}>
            {paragraph}
          </p>
        ))}
      </article>
    ))}
  </section>
);
