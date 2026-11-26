import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  description: Array<{ title: string; text: string[] }>;
}

export function AboutSection({ description }: AboutSectionProps): JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.heading}>
        About
      </h2>
      <div className={styles.content}>
        {description.map((item, index) => (
          <div key={index} className={styles.item}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <div className={styles.itemText}>
              {item.text.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
