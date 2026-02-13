import { DetailedList } from '@ui/index';
import styles from '../styles/infoSection/infoSection.module.scss';
import { Article } from './article';

type Props = {
  data: {
    description: { title: string; text: string[] }[] | null;
    extendedDetailedList: Record<string, string | null>;
  };
};

export const InfoSection = ({ data }: Props) => {
  const { description, extendedDetailedList } = data;

  return (
    <article className={styles.articleSection} aria-label="Product description">
      <section
        className={styles['article-section-container']}
        aria-labelledby="about-heading"
      >
        <h2 className={styles.heading} id="about-heading">
          about
        </h2>
        <Article description={description} />
      </section>
      <section
        aria-labelledby="tech-specs-heading"
        className={styles['article-section-container']}
      >
        <h2 className={styles.heading} id="tech-specs-heading">
          tech specs
        </h2>
        <DetailedList listData={extendedDetailedList} />
      </section>
    </article>
  );
};
