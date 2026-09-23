import styles from './ProductAbout.module.scss';

type DescriptionItem = {
  title: string;
  text: string[];
};

type ProductAboutProps = {
  description: DescriptionItem[];
};

export const ProductAbout = ({ description }: ProductAboutProps) => {
  return (
    <section className={styles.section} data-cy="productDescription">
      <h2 className={styles.sectionTitle}>About</h2>

      <div className={styles.sectionDivider} />

      {description.map((detail, index) => (
        <div key={detail.title} className={styles.aboutBlock}>
          <h3 className={styles.aboutTitle}>{detail.title}</h3>

          {detail.text.map((text, textIndex) => (
            <p
              className={styles.aboutText}
              key={`${detail.title}-${index}-${textIndex}`}
            >
              {text}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};
