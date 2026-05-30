import React from 'react';
import styles from './AboutSection.module.scss';

type Props = {
  description: {
    title: string;
    text: string[];
  }[];
};

const AboutSection: React.FC<Props> = ({ description }) => {
  return (
    <section className={styles.about}>
      <h2 className={styles.about__title}>About</h2>
      {description.map((item, index) => (
        <div key={index}>
          <h3 className={styles.about__subtitle}>{item.title}</h3>
          <div className={styles.about__text}>
            {item.text.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default AboutSection;
