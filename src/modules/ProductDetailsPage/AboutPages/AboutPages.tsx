import styles from './AboutPages.module.scss';

interface AboutPagesProps {
  description: {
    title: string;
    text: string[];
  }[];
}

export const AboutPages: React.FC<AboutPagesProps> = ({ description }) => {
  return (
    <div className={styles.aboutPages__Container}>
      <div className={styles.aboutPages__Header}>
        <h1>About</h1>
      </div>
      <article className={styles.aboutPages__Paragraphs}>
        {description.map((s, index) => (
          <section key={index} className={styles.paragraph}>
            <h2 className={styles.description__Title}>{s.title}</h2>
            <p className={styles.description__Paragraph}>{s.text}</p>
          </section>
        ))}
      </article>
    </div>
  );
};
