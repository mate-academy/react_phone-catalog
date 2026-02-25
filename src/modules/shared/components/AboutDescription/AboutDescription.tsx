import React from 'react';
import styles from './AboutDescription.module.scss';

interface Props {
  desk: { title: string; text: string[] };
}

export const AboutDescription: React.FC<Props> = ({ desk }) => {
  return (
    <article key={desk.title} className={styles.about__item}>
      <h4 className={styles.about__subtitle}>{desk.title}</h4>

      {desk.text.map(text => (
        <p key={text} className={styles.about__text}>
          {text}
        </p>
      ))}
    </article>
  );
};
