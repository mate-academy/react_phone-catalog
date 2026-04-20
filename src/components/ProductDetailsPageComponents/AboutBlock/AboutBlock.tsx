import styles from './AboutBlock.module.scss';

interface DescriptionItem {
  title: string;
  text: string[];
}

interface Props {
  description: DescriptionItem[];
}

export const AboutBlock: React.FC<Props> = ({ description }) => {
  return (
    <>
      <h2 className={styles.aboutTitle}>About</h2>
      <div className={styles.content}>
        {description.map((item, index) => (
          <article key={index}>
            <h3 className={styles.subTitle}>{item.title}</h3>

            {item.text.map((paragraph, pIndex) => (
              <p key={pIndex} className={styles.descriptionText}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </>
  );
};
