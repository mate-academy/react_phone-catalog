import { ProductDescription } from '@/types/Product';
import styles from './About.module.scss';
import { FC } from 'react';

interface Props {
  description: ProductDescription[];
}

export const About: FC<Props> = ({ description }) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        {description.map(desc => (
          <article key={desc.title}>
            <h3 className={styles.subTitle}>{desc.title}</h3>

            {desc.text.map((tx, i) => (
              <p
                key={`${desc.title}-paragraph-${i}`}
                className={styles.description}
              >
                {tx}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
};
