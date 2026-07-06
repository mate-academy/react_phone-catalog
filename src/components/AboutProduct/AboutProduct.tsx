import styles from './AboutProduct.module.scss';

interface Props {
  description: { title: string; text: string[] }[];
}

export const AboutProduct = ({ description }: Props) => {
  return (
    <div className={styles.AboutBlock}>
      <hr className={styles.divider} />
      {description.map(section => (
        <div key={section.title} className={styles.AboutSection}>
          <h3 className={styles.aboutTitle}>{section.title}</h3>
          {section.text.map(info => (
            <p key={info} className={styles.aboutText}>
              {info}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
