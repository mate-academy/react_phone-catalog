import { Phone } from '../../../../types/Phone';
import styles from './About.styles.module.scss';

type Props = {
  description: Phone['description'];
};

export const About: React.FC<Props> = ({ description }) => {
  return (
    <section className={styles.about}>
      <h2 className={styles.aboutTitle}>About</h2>
      {description.map(section => (
        <div className={styles.section} key={section.title}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>

          {section.text.map((text, index) => (
            <p key={index} className={styles.text}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};
